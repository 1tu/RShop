import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ProductAction, ProductState } from '../../store/modules/index';
import { ProductEntity } from '../../../server/modules/product/product.entity';

@Component({
  template: require('./RProduct.pug')
})
export class RProduct extends Vue {
  @ProductState item: Partial<ProductEntity>;

  @ProductAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

