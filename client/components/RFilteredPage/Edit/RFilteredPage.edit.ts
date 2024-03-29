import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

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
  ShopState,
  CategoryGetter
} from '../../../store/modules';
import { RSeoMetaEdit } from '../../RSeoMeta';
import { RSeoTemplateEdit } from '../../RSeoTemplate';
import { serverValidationErrorMessage } from '../../../helpers/error';
import { Mutation } from '../../../store';

@Component({
  template: require('./RFilteredPage.edit.pug'),
  components: { RSeoMetaEdit, RSeoTemplateEdit }
})
export class RFilteredPageEdit extends Vue {
  @Prop() onSubmit: (model: FilteredPageEntity) => void;
  @Prop() id: number;

  public model: Partial<FilteredPageEntity> = { filters: { baseCategoryId: null, categoryIdList: [], propertyKeyValueList: [] } };
  public filteredPageList: FilteredPageEntity[] = [];
  public dialogSeoMeta = false;
  public dialogSeoTemplate = false;

  @Mutation alertAdd;
  @ShopState('list') shopList;
  @SeoMetaState('list') seoMetaList;
  @SeoTemplateState('list') seoTemplateList;
  @ManufactureState('propList') propList;
  @CategoryState('listByBase') categoryListByBase;

  @CategoryGetter('listBase') categoryListBase;

  @FilteredPageAction get;
  @FilteredPageAction put;
  @FilteredPageAction post;

  @ShopAction('getList') getListShop;
  @SeoMetaAction('getList') getListSeoMeta;
  @SeoTemplateAction('getList') getListSeoTemplate;
  @ManufactureAction('getPropList') getPropList;
  @CategoryAction('getList') getListCategory;
  @CategoryAction('getListByBase') getListCategoryByBase;

  @SeoMetaMutation('listAdd') listAddSeoMeta;
  @SeoTemplateMutation('listAdd') listAddSeoTemplate;

  get keyList() {
    return this.propList.map(p => p.key);
  }
  public valueList(key: string) {
    if (!key) return [];
    return this.propList.find(p => p.key === key).options;
  }
  public addProp() {
    this.model.filters.propertyKeyValueList.push({} as any);
  }
  public removeProp(index: number) {
    this.model.filters.propertyKeyValueList.splice(index, 1);
  }

  @Watch('model.shop')
  @Watch('model.filters.baseCategoryId')
  public getListCategoryForSelect() {
    if (!this.model.shop || !this.model.filters.baseCategoryId) return;
    this.getListCategoryByBase({ id: this.model.filters.baseCategoryId, shopId: this.model.shop.id });
  }

  async mounted() {
    this.getListShop();
    this.getListSeoMeta();
    this.getListSeoTemplate();
    this.getListCategory();
    this.getPropList();
    this.getListCategoryForSelect();
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
      if (e.response.data.statusCode === 400) this.alertAdd({ type: 'error', text: serverValidationErrorMessage(e.response.data.message) });
    }
  }

  public clear() {
    this.model = { id: this.model.id, filters: { baseCategoryId: null, categoryIdList: [], propertyKeyValueList: [] } };
    this.$validator.reset();
  }
}
