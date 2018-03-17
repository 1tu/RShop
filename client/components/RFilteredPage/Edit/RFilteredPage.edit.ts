import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { FilteredPageEntity } from '../../../../server/modules/filteredPage/filteredPage.entity';
import { SeoMetaEntity } from '../../../../server/modules/seoMeta/seoMeta.entity';
import {
  CategoryAction,
  CategoryState,
  FilteredPageAction,
  SeoMetaAction,
  SeoMetaMutation,
  SeoMetaState,
  SeoTemplateAction,
  SeoTemplateState,
  ShopAction,
  ShopState,
} from '../../../store/modules';
import { RSeoMetaEdit } from '../../RSeoMeta';

@Component({
  template: require('./RFilteredPage.edit.pug'),
  components: { RSeoMetaEdit },
})
export class RFilteredPageEdit extends Vue {
  @Prop() onSubmit: (model: FilteredPageEntity) => void;
  @Prop() id: number;

  public model: Partial<FilteredPageEntity> = { filters: { categoryIdList: [], propertyKeyList: [] } };
  public filteredPageList: FilteredPageEntity[] = [];
  public dialogSeoMeta = false;

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

  @SeoMetaMutation('listAdd') listAddSeoMeta;

  async mounted() {
    this.getListShop();
    this.getListSeoMeta();
    this.getListSeoTemplate();
    this.getListCategory();
    const id = this.id != null ? this.id : parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    }
  }

  public onSeoMetaSubmit(model: SeoMetaEntity) {
    this.listAddSeoMeta(this.seoMetaList.concat(model));
    this.model.seoMeta = model;
    this.dialogSeoMeta = false;
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      const res = await this[this.model.id ? 'put' : 'post'](this.model);
      if (this.onSubmit) this.onSubmit(res);
      else this.$router.push('/FilteredPage');
    } catch (e) {
      console.log('filteredPage edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id, filters: { categoryIdList: [], propertyKeyList: [] } };
    this.$validator.reset();
  }
}

