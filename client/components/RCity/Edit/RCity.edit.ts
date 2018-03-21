import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { CityEntity } from '../../../../server/modules/city/city.entity';
import { serverValidationErrorMessage } from '../../../helpers/error';
import { Mutation } from '../../../store';
import { CityAction } from '../../../store/modules';

@Component({
  template: require('./RCity.edit.pug')
})
export class RCityEdit extends Vue {
  @Prop() onSubmit: (model: CityEntity) => void;
  @Prop() id: number;

  public model: Partial<CityEntity> = {};
  @Mutation alertAdd;
  @CityAction get;
  @CityAction put;
  @CityAction post;
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
      else this.$router.push('/City');
    } catch (e) {
      console.log('city edit error', e.response.data);
      if (e.response.data.statusCode === 400) this.alertAdd({ type: 'error', text: serverValidationErrorMessage(e.response.data.message) });
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}
