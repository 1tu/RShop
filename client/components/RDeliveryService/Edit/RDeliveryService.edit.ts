import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { DeliveryServiceAction, DeliveryServiceGetter, CityAction, CityState } from '../../../store/modules/index';
import { DeliveryServiceEntity } from '../../../../server/modules/deliveryService/deliveryService.entity';
import { cloneDeep } from 'lodash';

@Component({
  template: require('./RDeliveryService.edit.pug'),
})
export class RDeliveryServiceEdit extends Vue {
  public model: Partial<DeliveryServiceEntity> = {};
  @CityState('list') cityList;

  @DeliveryServiceAction get;
  @DeliveryServiceAction put;
  @DeliveryServiceAction post;
  @CityAction('getList') getListCity;

  async mounted() {
    this.getListCity();
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
      this.$router.push('/deliveryService');
    } catch (e) {
      console.log('deliveryService edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

