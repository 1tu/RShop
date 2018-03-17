import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { ShopEntity } from '../../../../server/modules/shop/shop.entity';
import { CityAction, CityState, ShopAction } from '../../../store/modules';

@Component({
  template: require('./RShop.edit.pug'),
})
export class RShopEdit extends Vue {
  @Prop() onSubmit: (model: ShopEntity) => void;
  @Prop() id: number;

  public model: Partial<ShopEntity> = {};
  @CityState('list') cityList;

  @ShopAction get;
  @ShopAction put;
  @ShopAction post;
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
      else this.$router.push('/Shop');
    } catch (e) {
      console.log('shop edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

