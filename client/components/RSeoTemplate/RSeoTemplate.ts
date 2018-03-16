import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { SeoTemplateAction, SeoTemplateState } from '../../store/modules/index';
import { SeoTemplateEntity } from '../../../server/modules/seoTemplate/seoTemplate.entity';

@Component({
  template: require('./RSeoTemplate.pug')
})
export class RSeoTemplate extends Vue {
  @SeoTemplateState item: Partial<SeoTemplateEntity>;

  @SeoTemplateAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

