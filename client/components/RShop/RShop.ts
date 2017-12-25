import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ShopAction, ShopState } from '../../store/modules/index';
import { ShopEntity } from '../../../server/modules/shop/shop.entity';

@Component({
  template: require('./RShop.pug')
})
export class RShop extends Vue {
  @ShopState item: Partial<ShopEntity>;

  @ShopAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

