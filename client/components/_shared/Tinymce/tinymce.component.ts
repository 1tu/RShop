import tinymce from 'tinymce/tinymce';

// Import TinyMCE
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/tabfocus';
import 'tinymce/skins/lightgray/skin.min.css';
import 'tinymce/themes/modern/theme';

import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

// A theme is also required
// Any plugins you want to use has to be imported
// import 'tinymce/plugins/advlist';
// import 'tinymce/plugins/wordcount';
// import 'tinymce/plugins/autolink';
// import 'tinymce/plugins/autosave';
// import 'tinymce/plugins/charmap';
// import 'tinymce/plugins/codesample';
// import 'tinymce/plugins/contextmenu';
// import 'tinymce/plugins/emoticons';
// import 'tinymce/plugins/hr';
// import 'tinymce/plugins/imagetools';
// import 'tinymce/plugins/insertdatetime';
// import 'tinymce/plugins/link';
// import 'tinymce/plugins/media';
// import 'tinymce/plugins/noneditable';
// import 'tinymce/plugins/paste';
// import 'tinymce/plugins/print';
// import 'tinymce/plugins/searchreplace';
// import 'tinymce/plugins/template';
// import 'tinymce/plugins/textpattern';
// import 'tinymce/plugins/visualblocks';
// import 'tinymce/plugins/anchor';
// import 'tinymce/plugins/bbcode';
// import 'tinymce/plugins/colorpicker';
// import 'tinymce/plugins/directionality';
// import 'tinymce/plugins/fullpage';
// import 'tinymce/plugins/help';
// import 'tinymce/plugins/image';
// import 'tinymce/plugins/importcss';
// import 'tinymce/plugins/legacyoutput';
// import 'tinymce/plugins/nonbreaking';
// import 'tinymce/plugins/pagebreak';
// import 'tinymce/plugins/save';
// import 'tinymce/plugins/spellchecker';
// import 'tinymce/plugins/table';
// import 'tinymce/plugins/textcolor';
// import 'tinymce/plugins/toc';
// import 'tinymce/plugins/visualchars';

@Component({
  template: require('./tinymce.pug')
})
export class Tinymce extends Vue {
  @Prop({ required: true })
  id: string;
  @Prop({ default: '' })
  htmlClass: string;
  @Prop({ default: '' })
  value: string;
  @Prop({
    default: () => [
      'code autoresize tabfocus preview fullscreen lists'
      // 'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      // 'searchreplace wordcount visualblocks visualchars code fullscreen',
      // 'insertdatetime media nonbreaking save table contextmenu directionality',
      // 'template paste textcolor colorpicker textpattern imagetools toc help emoticons hr codesample'
    ]
  })
  plugins: string[];
  @Prop({
    default:
      'formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat'
  })
  toolbar1: string;
  @Prop({ default: '' })
  toolbar2: string;
  @Prop({ default: () => ({}) })
  other_options: { [key: string]: any };
  @Prop({ default: false })
  readonly: boolean;

  public content: string = '';
  public editor = null;
  public cTinyMce = null;
  public checkerTimeout = null;
  public isTyping = false;

  mounted() {
    this.content = this.value;
    setTimeout(() => this.init(), 100);
    // this.init();
  }

  beforeDestroy() {
    this.editor.destroy();
  }

  @Watch('value')
  onValueChanged(newValue: string) {
    if (!this.isTyping) {
      if (this.editor !== null) this.editor.setContent(newValue);
      else this.content = newValue;
    }
  }

  @Watch('readonly')
  onReadonlyChanged(value) {
    if (value) {
      this.editor.setMode('readonly');
    } else {
      this.editor.setMode('design');
    }
  }

  public init() {
    let options = {
      selector: '#' + this.id,
      skin: false,
      toolbar1: this.toolbar1,
      toolbar2: this.toolbar2,
      plugins: this.plugins,
      init_instance_callback: this.initEditor
    };
    tinymce.init(this.concatAssciativeArrays(options, this.other_options));
  }

  public initEditor(editor) {
    this.editor = editor;
    editor.on('KeyUp', e => {
      this.submitNewContent();
    });
    editor.on('Change', e => {
      if (this.editor.getContent() !== this.value) {
        this.submitNewContent();
      }
      this.$emit('editorChange', e);
    });
    editor.on('init', e => {
      editor.setContent(this.content);
      this.$emit('input', this.content);
    });
    if (this.readonly) {
      this.editor.setMode('readonly');
    } else {
      this.editor.setMode('design');
    }

    this.$emit('editorInit', editor);
  }

  public concatAssciativeArrays(array1, array2) {
    if (array2.length === 0) return array1;
    if (array1.length === 0) return array2;
    let dest = [];
    for (let key in array1) dest[key] = array1[key];
    for (let key in array2) dest[key] = array2[key];
    return dest;
  }

  public submitNewContent() {
    this.isTyping = true;
    if (this.checkerTimeout !== null) clearTimeout(this.checkerTimeout);
    this.checkerTimeout = setTimeout(() => {
      this.isTyping = false;
    }, 300);

    this.$emit('input', this.editor.getContent());
  }
}
