import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ProductAction, ProductGetter, ShopAction, ShopState } from '../../../store/modules/index';
import { ProductEntity } from '../../../../server/modules/product/product.entity';
import { cloneDeep } from 'lodash';
import { ShopEntity } from '../../../../server/modules/shop/shop.entity';
import { ProductProperty } from '../../../../server/modules/product/product.property';

@Component({
  template: require('./RProduct.edit.pug'),
})
export class RProductEdit extends Vue {
  public model: Partial<ProductEntity> = { propertyList: [] };
  @ShopState('list') shopList;

  @ProductAction get;
  @ProductAction put;
  @ProductAction post;
  @ShopAction('getList') getListShop;

  async mounted() {
    const id = parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    } else {
      this.getListShop();
    }
  }

  public addProperty() {
    this.model.propertyList.push(new ProductProperty());
  }

  public removeProperty(property) {
    this.model.propertyList.splice(this.model.propertyList.indexOf(property), 1);
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      await this[this.model.id ? 'put' : 'post'](this.model);
      this.$router.push('/Product');
    } catch (e) {
      console.log('product edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id, propertyList: [] };
    this.$validator.reset();
  }
}

