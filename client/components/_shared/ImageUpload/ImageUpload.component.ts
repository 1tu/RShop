import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import axios from 'axios';
import { ImageEntity } from '../../../../server/modules/image/image.entity';

@Component({
  template: require('./ImageUpload.pug')
})
export class ImageUpload extends Vue {
  @Prop({ default: false })
  multiple: boolean;
  @Prop({ type: [Array, Object, String] })
  value: any;
  @Prop({ default: null })
  valueType: string;

  public dialog: boolean = false;
  public tempModel: Partial<ImageEntity> = { description: '', name: '' };
  public model: Partial<ImageEntity> | Array<Partial<ImageEntity>> | string = null;
  public selectedFile = null;

  mounted() {
    this.model = this.value || (this.multiple ? [] : {});
  }

  @Watch('value')
  onValueChanged(newValue: any) {
    this.model = newValue;
  }

  public typeofModel() {
    return Array.isArray(this.model) ? 'array' : typeof this.model;
  }

  public onFileSelect(event) {
    this._selectFile(event.target.files[0]);
  }

  public removeImage(index?: number) {
    if (this.multiple) (this.model as any[]).splice(index, 1);
    else this.model = null;
    this.$emit('input', this.model);
  }

  public async submit() {
    if (!await this.$validator.validateAll() || !this.selectedFile) return;
    try {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      formData.append('alt', this.tempModel.alt);
      formData.append('name', this.tempModel.name);
      formData.append('description', this.tempModel.description);
      const res = await axios.post('/image/upload', formData);

      this._onUpload(res.data);
    } catch (e) {
      console.log('product edit error', e.response.data);
    }
  }

  private _selectFile(file) {
    this.selectedFile = file;
    if (FileReader && file) {
      const fr = new FileReader();
      fr.onload = () => ((this.$refs.image as any).src = fr.result);
      fr.readAsDataURL(this.selectedFile);
    } else {
      (this.$refs.image as any).src = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';
    }
  }

  private _onUpload(model: ImageEntity) {
    this._selectFile(null);
    this.tempModel = { description: '', name: '' };
    this.dialog = false;

    if (this.multiple) (this.model as any).push(model);
    else if (this.valueType === 'filepath') this.model = model.filepath;
    else this.model = model;
    this.$emit('input', this.model);
  }
}
