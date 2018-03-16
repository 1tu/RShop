import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { SeoMetaAction, SeoMetaState } from '../../store/modules/index';
import { SeoMetaEntity } from '../../../server/modules/seoMeta/seoMeta.entity';

@Component({
  template: require('./RSeoMeta.pug')
})
export class RSeoMeta extends Vue {
  @SeoMetaState item: Partial<SeoMetaEntity>;

  @SeoMetaAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

