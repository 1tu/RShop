import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { DeliveryServiceEntity } from '../../../../server/modules/deliveryService/deliveryService.entity';
import { CityAction, CityState, DeliveryServiceAction } from '../../../store/modules';

@Component({
  template: require('./RDeliveryService.edit.pug'),
})
export class RDeliveryServiceEdit extends Vue {
  @Prop() onSubmit: (model: DeliveryServiceEntity) => void;
  @Prop() id: number;

  public model: Partial<DeliveryServiceEntity> = {};
  @CityState('list') cityList;

  @DeliveryServiceAction get;
  @DeliveryServiceAction put;
  @DeliveryServiceAction post;
  @CityAction('getList') getListCity;

  async mounted() {
    this.getListCity();
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
      else this.$router.push('/DeliveryService');
    } catch (e) {
      console.log('deliveryService edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

