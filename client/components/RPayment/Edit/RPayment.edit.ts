import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { PaymentAction, PaymentGetter, OrderAction, PaymentServiceAction, PaymentServiceState, OrderState } from '../../../store/modules/index';
import { PaymentEntity } from '../../../../server/modules/payment/payment.entity';
import { cloneDeep } from 'lodash';
import { PaymentStateEnumMap } from '../../../../server/modules/payment/payment.state.enum';
import { CurrencyEnumMap } from '../../../../shared/enum/currency.enum';

@Component({
  template: require('./RPayment.edit.pug'),
})
export class RPaymentEdit extends Vue {
  public model: Partial<PaymentEntity> = {};
  public stateList = PaymentStateEnumMap;
  public currencyList = CurrencyEnumMap;
  @PaymentServiceState('list') paymentServiceList;
  @OrderState('list') orderList;

  @PaymentAction get;
  @PaymentAction put;
  @PaymentAction post;
  @PaymentServiceAction('getList') getListPaymentService;
  @OrderAction('getList') getListOrder;

  async mounted() {
    const id = parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    } else {
      this.getListPaymentService();
      this.getListOrder();
    }
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      await this[this.model.id ? 'put' : 'post'](this.model);
      this.$router.push('/Payment');
    } catch (e) {
      console.log('payment edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

