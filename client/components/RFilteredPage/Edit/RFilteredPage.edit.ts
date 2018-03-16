import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { FilteredPageEntity } from '../../../../server/modules/filteredPage/filteredPage.entity';
import {
  CategoryAction,
  CategoryState,
  FilteredPageAction,
  SeoMetaAction,
  SeoMetaState,
  SeoTemplateAction,
  SeoTemplateState,
  ShopAction,
  ShopState,
} from '../../../store/modules';

@Component({
  template: require('./RFilteredPage.edit.pug'),
})
export class RFilteredPageEdit extends Vue {
  public model: Partial<FilteredPageEntity> = { filters: { categoryIdList: [], propertyKeyList: [] } };
  public filteredPageList: FilteredPageEntity[] = [];
  @ShopState('list') shopList;
  @SeoMetaState('list') seoMetaList;
  @SeoTemplateState('list') seoTemplateList;
  @CategoryState('list') categoryList;

  @FilteredPageAction get;
  @FilteredPageAction put;
  @FilteredPageAction post;

  @ShopAction('getList') getListShop;
  @SeoMetaAction('getList') getListSeoMeta;
  @SeoTemplateAction('getList') getListSeoTemplate;
  @CategoryAction('getList') getListCategory;

  async mounted() {
    this.getListShop();
    this.getListSeoMeta();
    this.getListSeoTemplate();
    this.getListCategory();
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
      this.$router.push('/FilteredPage');
    } catch (e) {
      console.log('filteredPage edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id, filters: { categoryIdList: [], propertyKeyList: [] } };
    this.$validator.reset();
  }
}

