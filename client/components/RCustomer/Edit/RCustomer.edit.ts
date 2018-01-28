import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CustomerAction, CustomerGetter, CityAction, CityState } from '../../../store/modules/index';
import { CustomerEntity } from '../../../../server/modules/customer/customer.entity';
import { cloneDeep } from 'lodash';
import { CustomerCameFromEnumMap } from '../../../../server/modules/customer/customer.cameFrom.enum';

@Component({
  template: require('./RCustomer.edit.pug'),
})
export class RCustomerEdit extends Vue {
  public model: Partial<CustomerEntity> = {};
  public cameFromList = CustomerCameFromEnumMap;
  @CityState('list') cityList;

  @CustomerAction get;
  @CustomerAction put;
  @CustomerAction post;
  @CityAction('getList') getListCity;

  async mounted() {
    this.getListCity();
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
      this.$router.push('/Customer');
    } catch (e) {
      console.log('customer edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

