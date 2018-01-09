import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { DeliveryAction, DeliveryState } from '../../store/modules/index';
import { DeliveryEntity } from '../../../server/modules/delivery/delivery.entity';

@Component({
  template: require('./RDelivery.pug')
})
export class RDelivery extends Vue {
  @DeliveryState item: Partial<DeliveryEntity>;

  @DeliveryAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

