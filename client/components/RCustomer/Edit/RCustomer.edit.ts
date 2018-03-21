import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { CustomerCameFromEnumMap } from '../../../../server/modules/customer/customer.cameFrom.enum';
import { CustomerEntity } from '../../../../server/modules/customer/customer.entity';
import { serverValidationErrorMessage } from '../../../helpers/error';
import { Mutation } from '../../../store';
import { CityAction, CityState, CustomerAction } from '../../../store/modules';

@Component({
  template: require('./RCustomer.edit.pug')
})
export class RCustomerEdit extends Vue {
  @Prop() onSubmit: (model: CustomerEntity) => void;
  @Prop() id: number;

  public datePicker = false;

  public model: Partial<CustomerEntity> = {};
  public cameFromList = CustomerCameFromEnumMap;
  @Mutation alertAdd;
  @CityState('list') cityList;

  @CustomerAction get;
  @CustomerAction put;
  @CustomerAction post;
  @CityAction('getList') getListCity;

  async mounted() {
    this.getListCity();
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
      else this.$router.push('/Customer');
    } catch (e) {
      console.log('customer edit error', e.response.data);
      if (e.response.data.statusCode === 400) this.alertAdd({ type: 'error', text: serverValidationErrorMessage(e.response.data.message) });
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}
