import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { DeliveryEntity } from '../../../../server/modules/delivery/delivery.entity';
import { DeliveryStateEnumMap } from '../../../../server/modules/delivery/delivery.state.enum';
import { CityAction, CityState, DeliveryAction, DeliveryServiceAction, DeliveryServiceState } from '../../../store/modules';
import { serverValidationErrorMessage } from '../../../helpers/error';
import { Mutation } from '../../../store';

@Component({
  template: require('./RDelivery.edit.pug')
})
export class RDeliveryEdit extends Vue {
  @Prop() onSubmit: (model: DeliveryEntity) => void;
  @Prop() id: number;

  public datePickers = {
    sent: false,
    approximate: false,
    recieved: false
  };

  public model: Partial<DeliveryEntity> = {};
  public stateList = DeliveryStateEnumMap;
  @Mutation alertAdd;
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
      else this.$router.push('/Delivery');
    } catch (e) {
      console.log('delivery edit error', e.response.data);
      if (e.response.data.statusCode === 400) this.alertAdd({ type: 'error', text: serverValidationErrorMessage(e.response.data.message) });
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}
