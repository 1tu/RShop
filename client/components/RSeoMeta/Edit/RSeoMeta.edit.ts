import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { SeoMetaEntity } from '../../../../server/modules/seoMeta/seoMeta.entity';
import { SeoMetaAction } from '../../../store/modules';

@Component({
  template: require('./RSeoMeta.edit.pug'),
})
export class RSeoMetaEdit extends Vue {
  public model: Partial<SeoMetaEntity> = { keys: ['', ''] };

  @SeoMetaAction get;
  @SeoMetaAction put;
  @SeoMetaAction post;
  async mounted() {
    const id = parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    }
  }

  public addKey() {
    this.model.keys.push('');
  }

  public removeKey(index: number) {
    if (this.model.keys.length < 3) return;
    this.model.keys.splice(index, 1);
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      await this[this.model.id ? 'put' : 'post'](this.model);
      this.$router.push('/SeoMeta');
    } catch (e) {
      console.log('seoMeta edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id, keys: ['', ''] };
    this.$validator.reset();
  }
}

