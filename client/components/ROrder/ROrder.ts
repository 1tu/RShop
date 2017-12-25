import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { OrderAction, OrderState } from '../../store/modules/index';
import { OrderEntity } from '../../../server/modules/order/order.entity';

@Component({
  template: require('./ROrder.pug')
})
export class ROrder extends Vue {
  @OrderState item: Partial<OrderEntity>;

  @OrderAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

