import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { PaymentEntity } from '../../../../server/modules/payment/payment.entity';
import { PaymentStateEnumMap } from '../../../../server/modules/payment/payment.state.enum';
import { CurrencyEnumMap } from '../../../../shared/enum/currency.enum';
import { OrderAction, OrderState, PaymentAction, PaymentServiceAction, PaymentServiceState } from '../../../store/modules';
import { serverValidationErrorMessage } from '../../../helpers/error';
import { Mutation } from '../../../store';

@Component({
  template: require('./RPayment.edit.pug')
})
export class RPaymentEdit extends Vue {
  @Prop() onSubmit: (model: PaymentEntity) => void;
  @Prop() id: number;

  public model: Partial<PaymentEntity> = {};
  public stateList = PaymentStateEnumMap;
  public currencyList = CurrencyEnumMap;
  @Mutation alertAdd;
  @PaymentServiceState('list') paymentServiceList;
  @OrderState('list') orderList;

  @PaymentAction get;
  @PaymentAction put;
  @PaymentAction post;
  @PaymentServiceAction('getList') getListPaymentService;
  @OrderAction('getList') getListOrder;

  async mounted() {
    const id = this.id != null ? this.id : parseInt(this.$route.params.id);
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
      const res = await this[this.model.id ? 'put' : 'post'](this.model);
      if (this.onSubmit) this.onSubmit(res);
      else this.$router.push('/Payment');
    } catch (e) {
      console.log('payment edit error', e.response.data);
      if (e.response.data.statusCode === 400) this.alertAdd({ type: 'error', text: serverValidationErrorMessage(e.response.data.message) });
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}
