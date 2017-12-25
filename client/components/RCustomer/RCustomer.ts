import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CustomerAction, CustomerState } from '../../store/modules/index';
import { CustomerEntity } from '../../../server/modules/customer/customer.entity';

@Component({
  template: require('./RCustomer.pug')
})
export class RCustomer extends Vue {
  @CustomerState item: Partial<CustomerEntity>;

  @CustomerAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

