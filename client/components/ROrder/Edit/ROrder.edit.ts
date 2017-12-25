import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { OrderAction, OrderGetter } from '../../../store/modules/index';
import { OrderEntity } from '../../../../server/modules/order/order.entity';
import { cloneDeep } from 'lodash';

@Component({
  template: require('./ROrder.edit.pug'),
})
export class ROrderEdit extends Vue {
  public model: Partial<OrderEntity> = {};

  @OrderAction get;
  @OrderAction put;
  @OrderAction post;
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
      this.$router.push('/order');
    } catch (e) {
      console.log('order edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

