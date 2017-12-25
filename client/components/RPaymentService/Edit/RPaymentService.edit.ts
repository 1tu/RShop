import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { PaymentServiceAction, PaymentServiceGetter } from '../../../store/modules/index';
import { PaymentServiceEntity } from '../../../../server/modules/paymentService/paymentService.entity';
import { cloneDeep } from 'lodash';

@Component({
  template: require('./RPaymentService.edit.pug'),
})
export class RPaymentServiceEdit extends Vue {
  public model: Partial<PaymentServiceEntity> = {};

  @PaymentServiceAction get;
  @PaymentServiceAction put;
  @PaymentServiceAction post;
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
      this.$router.push('/paymentService');
    } catch (e) {
      console.log('paymentService edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

