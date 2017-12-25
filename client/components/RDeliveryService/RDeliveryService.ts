import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { DeliveryServiceAction, DeliveryServiceState } from '../../store/modules/index';
import { DeliveryServiceEntity } from '../../../server/modules/deliveryService/deliveryService.entity';

@Component({
  template: require('./RDeliveryService.pug')
})
export class RDeliveryService extends Vue {
  @DeliveryServiceState item: Partial<DeliveryServiceEntity>;

  @DeliveryServiceAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

