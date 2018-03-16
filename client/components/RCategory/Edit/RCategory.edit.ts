import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { CategoryEntity } from '../../../../server/modules/category/category.entity';
import {
  CategoryAction,
  SeoMetaAction,
  SeoMetaState,
  SeoTemplateAction,
  SeoTemplateState,
  ShopAction,
  ShopState,
} from '../../../store/modules';

@Component({
  template: require('./RCategory.edit.pug'),
})
export class RCategoryEdit extends Vue {
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

  async mounted() {
    this.getListShop();
    this.getListSeoMeta();
    this.getListSeoTemplate();
    this.categoryList = await this.getListCategory();
    const id = parseInt(this.$route.params.id);
    if (id) {
      this.categoryList = this.categoryList.filter(c => c.id !== id);
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    }
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
      await this[this.model.id ? 'put' : 'post'](this.model);
      this.$router.push('/Category');
    } catch (e) {
      console.log('category edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id, seoList: [{}] as any };
    this.$validator.reset();
  }
}

