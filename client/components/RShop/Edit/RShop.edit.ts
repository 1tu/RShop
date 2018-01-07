import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ShopAction, ShopGetter, CityAction, CityState } from '../../../store/modules/index';
import { ShopEntity } from '../../../../server/modules/shop/shop.entity';
import { cloneDeep } from 'lodash';
import { CityEntity } from '../../../../server/modules/city/city.entity';

@Component({
  template: require('./RShop.edit.pug'),
})
export class RShopEdit extends Vue {
  public model: Partial<ShopEntity> = {};
  @CityState('list') cityList;

  @ShopAction get;
  @ShopAction put;
  @ShopAction post;
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
      this.$router.push('/shop');
    } catch (e) {
      console.log('shop edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

