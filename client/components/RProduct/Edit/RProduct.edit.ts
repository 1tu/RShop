import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { CategoryEntity } from '../../../../server/modules/category/category.entity';
import { ProductEntity } from '../../../../server/modules/product/product.entity';
import { ProductProperty } from '../../../../server/modules/product/product.property';
import { ProductCategoryEntity } from '../../../../server/modules/product_category/product_category.entity';
import { SeoMetaEntity } from '../../../../server/modules/seoMeta/seoMeta.entity';
import {
  CategoryAction,
  CategoryState,
  ProductAction,
  SeoMetaAction,
  SeoMetaMutation,
  SeoMetaState,
  ShopAction,
  ShopState,
  SeoTemplateState,
  SeoTemplateAction,
  SeoTemplateMutation
} from '../../../store/modules';
import { ImageUpload } from '../../_shared/ImageUpload/ImageUpload.component';
import { RSeoMetaEdit } from '../../RSeoMeta';
import { SeoTemplateEntity } from '../../../../server/modules/seoTemplate/seoTemplate.entity';
import { RSeoTemplateEdit } from '../../RSeoTemplate';
import { Mutation } from '../../../store';
import { serverValidationErrorMessage } from '../../../helpers/error';

@Component({
  template: require('./RProduct.edit.pug'),
  components: { RSeoMetaEdit, RSeoTemplateEdit, ImageUpload }
})
export class RProductEdit extends Vue {
  @Prop() onSubmit: (model: ProductEntity) => void;
  @Prop() id: number;

  public model: Partial<ProductEntity> = { propertyList: [], categoryList: [] };
  public dialogSeoMeta = false;
  public dialogSeoTemplate = false;
  @Mutation alertAdd;

  @ShopState('list') shopList;
  @CategoryState('list') categoryList;
  @SeoMetaState('list') seoMetaList;
  @SeoTemplateState('list') seoTemplateList;

  @ProductAction get;
  @ProductAction put;
  @ProductAction post;
  @ShopAction('getList') getListShop;
  @CategoryAction('getList') getListCategory;
  @SeoMetaAction('getList') getListSeoMeta;
  @SeoTemplateAction('getList') getListSeoTemplate;

  @SeoMetaMutation('listAdd') listAddSeoMeta;
  @SeoTemplateMutation('listAdd') listAddSeoTemplate;

  async mounted() {
    this.getListCategory();
    this.getListSeoMeta();
    this.getListSeoTemplate();
    this.getListShop();
    const id = this.id != null ? this.id : parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    } else {
    }
  }

  public onSeoMetaSubmit(model: SeoMetaEntity) {
    this.listAddSeoMeta(model);
    this.model.seoMeta = model;
    this.dialogSeoMeta = false;
  }
  public onSeoTemplateSubmit(model: SeoTemplateEntity) {
    this.listAddSeoTemplate(model);
    this.model.seoTemplate = model;
    this.dialogSeoTemplate = false;
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
    const temp = {} as any;
    if (this.model.id) temp.product = { id: this.model.id };
    this.model.categoryList.push(temp);
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
      if (e.response.data.statusCode === 400) this.alertAdd({ type: 'error', text: serverValidationErrorMessage(e.response.data.message) });
    }
  }

  public clear() {
    this.model = { id: this.model.id, propertyList: [], categoryList: [] };
    this.$validator.reset();
  }
}
