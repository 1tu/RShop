import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { FilteredPageEntity } from '../../../../server/modules/filteredPage/filteredPage.entity';
import { SeoMetaEntity } from '../../../../server/modules/seoMeta/seoMeta.entity';
import { SeoTemplateEntity } from '../../../../server/modules/seoTemplate/seoTemplate.entity';
import {
  CategoryAction,
  CategoryState,
  FilteredPageAction,
  ManufactureAction,
  ManufactureState,
  SeoMetaAction,
  SeoMetaMutation,
  SeoMetaState,
  SeoTemplateAction,
  SeoTemplateMutation,
  SeoTemplateState,
  ShopAction,
  ShopState
} from '../../../store/modules';
import { RSeoMetaEdit } from '../../RSeoMeta';
import { RSeoTemplateEdit } from '../../RSeoTemplate';

@Component({
  template: require('./RFilteredPage.edit.pug'),
  components: { RSeoMetaEdit, RSeoTemplateEdit }
})
export class RFilteredPageEdit extends Vue {
  @Prop() onSubmit: (model: FilteredPageEntity) => void;
  @Prop() id: number;

  public model: Partial<FilteredPageEntity> = { filters: { categoryIdList: [], propertyKeyValueList: [] } };
  public filteredPageList: FilteredPageEntity[] = [];
  public dialogSeoMeta = false;
  public dialogSeoTemplate = false;

  @ShopState('list') shopList;
  @SeoMetaState('list') seoMetaList;
  @SeoTemplateState('list') seoTemplateList;
  @CategoryState('list') categoryList;
  @ManufactureState('propList') propList;

  @FilteredPageAction get;
  @FilteredPageAction put;
  @FilteredPageAction post;

  @ShopAction('getList') getListShop;
  @SeoMetaAction('getList') getListSeoMeta;
  @SeoTemplateAction('getList') getListSeoTemplate;
  @CategoryAction('getList') getListCategory;
  @ManufactureAction('getPropList') getPropList;

  @SeoMetaMutation('listAdd') listAddSeoMeta;
  @SeoTemplateMutation('listAdd') listAddSeoTemplate;

  get keyList() {
    return Object.keys(this.propList);
  }
  public valueList(key: string) {
    return this.propList[key];
  }
  public addProp() {
    this.model.filters.propertyKeyValueList.push({} as any);
  }
  public removeProp(index: number) {
    this.model.filters.propertyKeyValueList.splice(index, 1);
  }

  async mounted() {
    this.getListShop();
    this.getListSeoMeta();
    this.getListSeoTemplate();
    this.getListCategory();
    this.getPropList();
    const id = this.id != null ? this.id : parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
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
    this.model = { id: this.model.id, filters: { categoryIdList: [], propertyKeyValueList: [] } };
    this.$validator.reset();
  }
}
