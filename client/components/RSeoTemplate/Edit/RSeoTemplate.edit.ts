import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { SeoTemplateEntity } from '../../../../server/modules/seoTemplate/seoTemplate.entity';
import { SeoTemplateAction } from '../../../store/modules';

@Component({
  template: require('./RSeoTemplate.edit.pug'),
})
export class RSeoTemplateEdit extends Vue {
  @Prop() onSubmit: (model: SeoTemplateEntity) => void;
  @Prop() id: number;

  public model: Partial<SeoTemplateEntity> = { };

  @SeoTemplateAction get;
  @SeoTemplateAction put;
  @SeoTemplateAction post;
  async mounted() {
    const id = this.id != null ? this.id : parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    }
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      const res = await this[this.model.id ? 'put' : 'post'](this.model);
      if (this.onSubmit) this.onSubmit(res);
      else this.$router.push('/SeoTemplate');
    } catch (e) {
      console.log('seoTemplate edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

