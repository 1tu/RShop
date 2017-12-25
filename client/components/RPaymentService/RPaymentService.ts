import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { PaymentServiceAction, PaymentServiceState } from '../../store/modules/index';
import { PaymentServiceEntity } from '../../../server/modules/paymentService/paymentService.entity';

@Component({
  template: require('./RPaymentService.pug')
})
export class RPaymentService extends Vue {
  @PaymentServiceState item: Partial<PaymentServiceEntity>;

  @PaymentServiceAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

