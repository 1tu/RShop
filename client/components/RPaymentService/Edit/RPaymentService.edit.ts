import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { PaymentServiceEntity } from '../../../../server/modules/paymentService/paymentService.entity';
import { PaymentServiceTaxTypeEnumMap } from '../../../../server/modules/paymentService/paymentService.taxType.enum';
import { DeliveryServiceAction, DeliveryServiceState, PaymentServiceAction } from '../../../store/modules';
import { serverValidationErrorMessage } from '../../../helpers/error';
import { Mutation } from '../../../store';

@Component({
  template: require('./RPaymentService.edit.pug')
})
export class RPaymentServiceEdit extends Vue {
  @Prop() onSubmit: (model: PaymentServiceEntity) => void;
  @Prop() id: number;

  public model: Partial<PaymentServiceEntity> = {};
  public taxTypeList = PaymentServiceTaxTypeEnumMap;
  @Mutation alertAdd;
  @DeliveryServiceState('list') deliveryServiceList;

  @PaymentServiceAction get;
  @PaymentServiceAction put;
  @PaymentServiceAction post;
  @DeliveryServiceAction('getList') getListDeliveryService;

  async mounted() {
    this.getListDeliveryService();
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
      else this.$router.push('/PaymentService');
    } catch (e) {
      console.log('paymentService edit error', e.response.data);
      if (e.response.data.statusCode === 400) this.alertAdd({ type: 'error', text: serverValidationErrorMessage(e.response.data.message) });
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}
