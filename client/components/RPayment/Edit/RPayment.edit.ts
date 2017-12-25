import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { PaymentAction, PaymentGetter } from '../../../store/modules/index';
import { PaymentEntity } from '../../../../server/modules/payment/payment.entity';
import { cloneDeep } from 'lodash';

@Component({
  template: require('./RPayment.edit.pug'),
})
export class RPaymentEdit extends Vue {
  public model: Partial<PaymentEntity> = {};

  @PaymentAction get;
  @PaymentAction put;
  @PaymentAction post;
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
      this.$router.push('/payment');
    } catch (e) {
      console.log('payment edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

