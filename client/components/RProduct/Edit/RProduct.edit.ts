import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { CategoryEntity } from '../../../../server/modules/category/category.entity';
import { ProductEntity } from '../../../../server/modules/product/product.entity';
import { ProductProperty } from '../../../../server/modules/product/product.property';
import { ProductCategoryEntity } from '../../../../server/modules/product_category/product_category.entity';
import { CategoryAction, CategoryState, ProductAction, ShopAction, ShopState } from '../../../store/modules';

@Component({
  template: require('./RProduct.edit.pug')
})
export class RProductEdit extends Vue {
  @Prop() onSubmit: (model: ProductEntity) => void;
  @Prop() id: number;

  public model: Partial<ProductEntity> = { propertyList: [], categoryList: [] };
  @ShopState('list') shopList;
  @CategoryState('list') categoryList;

  @ProductAction get;
  @ProductAction put;
  @ProductAction post;
  @ShopAction('getList') getListShop;
  @CategoryAction('getList') getListCategory;

  async mounted() {
    this.getListCategory();
    const id = this.id != null ? this.id : parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    } else {
      this.getListShop();
    }
  }

  public filterSelectedCategory(cItem: ProductCategoryEntity) {
    return (c: CategoryEntity) => {
      if (cItem && cItem.category && c.id === cItem.category.id) return true;
      return !this.model.categoryList.find(item => item.category && item.category.id === c.id);
    };
  }

  public checkSingleMainCategory(index: number) {
    const mainCategory = this.model.categoryList.find((item, i) => item.isMain && i !== index);
    if (mainCategory) mainCategory.isMain = false;
  }

  public addProperty() {
    this.model.propertyList.push(new ProductProperty());
  }
  public removeProperty(index) {
    this.model.propertyList.splice(index, 1);
  }

  public addCategory() {
    this.model.categoryList.push({} as any);
  }
  public removeCategory(index) {
    this.model.categoryList.splice(index, 1);
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
    this.model = { id: this.model.id, propertyList: [], categoryList: [] };
    this.$validator.reset();
  }
}
