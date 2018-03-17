import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { CategoryEntity } from '../../../../server/modules/category/category.entity';
import { CategoryShopEntity } from '../../../../server/modules/category_shop/category_shop.entity';
import { SeoMetaEntity } from '../../../../server/modules/seoMeta/seoMeta.entity';
import { SeoTemplateEntity } from '../../../../server/modules/seoTemplate/seoTemplate.entity';
import {
  CategoryAction,
  SeoMetaAction,
  SeoMetaMutation,
  SeoMetaState,
  SeoTemplateAction,
  SeoTemplateMutation,
  SeoTemplateState,
  ShopAction,
  ShopState,
} from '../../../store/modules';
import { RSeoMetaEdit } from '../../RSeoMeta';
import { RSeoTemplateEdit } from '../../RSeoTemplate';

@Component({
  template: require('./RCategory.edit.pug'),
  components: { RSeoMetaEdit, RSeoTemplateEdit },
})
export class RCategoryEdit extends Vue {
  @Prop() onSubmit: (model: CategoryEntity) => void;
  @Prop() id: number;

  public dialogSeoMeta = false;
  public dialogSeoTemplate = false;

  public model: Partial<CategoryEntity> = { seoList: [{}] as any };
  public categoryList: CategoryEntity[] = [];
  @ShopState('list') shopList;
  @SeoMetaState('list') seoMetaList;
  @SeoTemplateState('list') seoTemplateList;

  @CategoryAction get;
  @CategoryAction put;
  @CategoryAction post;

  @CategoryAction('getList') getListCategory;
  @ShopAction('getList') getListShop;
  @SeoMetaAction('getList') getListSeoMeta;
  @SeoTemplateAction('getList') getListSeoTemplate;

  @SeoMetaMutation('listAdd') listAddSeoMeta;
  @SeoTemplateMutation('listAdd') listAddSeoTemplate;

  private _lastSeoItem: CategoryShopEntity;

  async mounted() {
    this.getListShop();
    this.getListSeoMeta();
    this.getListSeoTemplate();
    this.categoryList = await this.getListCategory();
    const id = this.id != null ? this.id : parseInt(this.$route.params.id);
    if (id) {
      this.categoryList = this.categoryList.filter(c => c.id !== id);
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    }
  }

  public openDialog(type: 'Template' | 'Meta', seoItem: CategoryShopEntity) {
    this._lastSeoItem = seoItem;
    this['dialogSeo' + type] = true;
  }

  public onSeoMetaSubmit(model: SeoMetaEntity) {
    this.listAddSeoMeta(model);
    this._lastSeoItem.seoMeta = model;
    this.dialogSeoMeta = false;
  }

  public onSeoTemplateSubmit(model: SeoTemplateEntity) {
    this.listAddSeoTemplate(model);
    this._lastSeoItem.seoTemplate = model;
    this.dialogSeoTemplate = false;
  }

  public addSeo() {
    this.model.seoList.push({} as any);
  }

  public removeSeo(index) {
    this.model.seoList.splice(index, 1);
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      const res = await this[this.model.id ? 'put' : 'post'](this.model);
      if (this.onSubmit) this.onSubmit(res);
      else this.$router.push('/Category');
    } catch (e) {
      console.log('category edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id, seoList: [{}] as any };
    this.$validator.reset();
  }
}

