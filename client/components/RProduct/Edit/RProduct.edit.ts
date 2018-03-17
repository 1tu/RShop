import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { ProductEntity } from '../../../../server/modules/product/product.entity';
import { ProductProperty } from '../../../../server/modules/product/product.property';
import { ProductAction, ShopAction, ShopState } from '../../../store/modules';

@Component({
  template: require('./RProduct.edit.pug'),
})
export class RProductEdit extends Vue {
  @Prop() onSubmit: (model: ProductEntity) => void;
  @Prop() id: number;

  public model: Partial<ProductEntity> = { propertyList: [] };
  @ShopState('list') shopList;

  @ProductAction get;
  @ProductAction put;
  @ProductAction post;
  @ShopAction('getList') getListShop;

  async mounted() {
    const id = this.id != null ? this.id : parseInt(this.$route.params.id);
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
      const res = await this[this.model.id ? 'put' : 'post'](this.model);
      if (this.onSubmit) this.onSubmit(res);
      else this.$router.push('/Product');
    } catch (e) {
      console.log('product edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id, propertyList: [] };
    this.$validator.reset();
  }
}

