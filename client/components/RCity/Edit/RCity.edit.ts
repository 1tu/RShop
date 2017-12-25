import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CityAction, CityGetter } from '../../../store/modules/index';
import { CityEntity } from '../../../../server/modules/city/city.entity';
import { cloneDeep } from 'lodash';

@Component({
  template: require('./RCity.edit.pug'),
})
export class RCityEdit extends Vue {
  public model: Partial<CityEntity> = {};

  @CityAction get;
  @CityAction put;
  @CityAction post;
  async mounted() {
    const id = parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    }
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      await this[this.model.id ? 'put' : 'post'](this.model);
      this.$router.push('/city');
    } catch (e) {
      console.log('city edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

