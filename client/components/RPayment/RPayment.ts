import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { PaymentAction, PaymentState } from '../../store/modules/index';
import { PaymentEntity } from '../../../server/modules/payment/payment.entity';

@Component({
  template: require('./RPayment.pug')
})
export class RPayment extends Vue {
  @PaymentState item: Partial<PaymentEntity>;

  @PaymentAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

