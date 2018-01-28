import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { DeliveryAction, DeliveryGetter, CityAction, CityState, DeliveryServiceState, DeliveryServiceAction } from '../../../store/modules/index';
import { DeliveryEntity } from '../../../../server/modules/delivery/delivery.entity';
import { cloneDeep } from 'lodash';
import { DeliveryStateEnumMap } from '../../../../server/modules/delivery/delivery.state.enum';

@Component({
  template: require('./RDelivery.edit.pug'),
})
export class RDeliveryEdit extends Vue {
  public model: Partial<DeliveryEntity> = {};
  public stateList = DeliveryStateEnumMap;
  @CityState('list') cityList;
  @DeliveryServiceState('list') deliveryServiceList;

  @DeliveryAction get;
  @DeliveryAction put;
  @DeliveryAction post;
  @CityAction('getList') getListCity;
  @DeliveryServiceAction('getList') getListDeliveryService;

  async mounted() {
    this.getListCity();
    this.getListDeliveryService();
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
      this.$router.push('/Delivery');
    } catch (e) {
      console.log('delivery edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

