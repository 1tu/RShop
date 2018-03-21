import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { CategoryEntity } from '../../../../server/modules/category/category.entity';
import { ManufactureEntity } from '../../../../server/modules/manufacture/manufacture.entity';
import { PreManufactureConfigItem } from '../../../../server/modules/preManufacture/preManufacture.configItem';
import { PreManufactureEntity } from '../../../../server/modules/preManufacture/preManufacture.entity';
import { PreManufactureCategoryEntity } from '../../../../server/modules/preManufacture_category/preManufacture_category.entity';
import { SeoMetaEntity } from '../../../../server/modules/seoMeta/seoMeta.entity';
import { SeoTemplateEntity } from '../../../../server/modules/seoTemplate/seoTemplate.entity';
import { serverValidationErrorMessage } from '../../../helpers/error';
import { Mutation } from '../../../store';
import {
  CategoryAction,
  CategoryState,
  ManufactureAction,
  ManufactureState,
  PreManufactureAction,
  SeoMetaAction,
  SeoMetaMutation,
  SeoMetaState,
  SeoTemplateAction,
  SeoTemplateMutation,
  SeoTemplateState
} from '../../../store/modules';
import { ImageUpload } from '../../_shared/ImageUpload/ImageUpload.component';
import { RSeoMetaEdit } from '../../RSeoMeta';
import { RSeoTemplateEdit } from '../../RSeoTemplate';

@Component({
  template: require('./RPreManufacture.edit.pug'),
  components: { RSeoMetaEdit, RSeoTemplateEdit, ImageUpload }
})
export class RPreManufactureEdit extends Vue {
  @Prop() onSubmit: (model: PreManufactureEntity) => void;
  @Prop() id: number;

  public model: Partial<PreManufactureEntity> = { config: [], categoryList: [] };
  public dialogSeoMeta = false;
  public dialogSeoTemplate = false;
  @Mutation alertAdd;

  @ManufactureState('list') manufactureList;
  @CategoryState('list') categoryList;
  @SeoMetaState('list') seoMetaList;
  @SeoTemplateState('list') seoTemplateList;

  @PreManufactureAction get;
  @PreManufactureAction put;
  @PreManufactureAction post;
  @ManufactureAction('getList') getListManufacture;
  @CategoryAction('getList') getListCategory;
  @SeoMetaAction('getList') getListSeoMeta;
  @SeoTemplateAction('getList') getListSeoTemplate;

  @SeoMetaMutation('listAdd') listAddSeoMeta;
  @SeoTemplateMutation('listAdd') listAddSeoTemplate;

  async mounted() {
    this.getListCategory();
    this.getListManufacture();
    this.getListSeoMeta();
    this.getListSeoTemplate();
    const id = this.id != null ? this.id : parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
      this.onSelectManufacture(this.model.manufacture);
    }
  }

  public createFromModel() {
    this.model = cloneDeep(this.model);
    this.model.id = undefined;
    this.model.seoMeta = undefined;
    if (this.model.categoryList) this.model.categoryList.forEach(c => (c.id = undefined));
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

  public filterSelectedCategory(cItem: PreManufactureCategoryEntity) {
    return (c: CategoryEntity) => {
      if (cItem && cItem.category && c.id === cItem.category.id) return true;
      return !this.model.categoryList.find(item => item.category && item.category.id === c.id);
    };
  }

  public checkSingleMainCategory(index: number) {
    const mainCategory = this.model.categoryList.find((item, i) => item.isMain && i !== index);
    if (mainCategory) mainCategory.isMain = false;
  }

  public addCategory() {
    this.model.categoryList.push({} as any);
  }
  public removeCategory(index) {
    this.model.categoryList.splice(index, 1);
  }

  public onSelectManufacture(manufacture: ManufactureEntity) {
    this.model.config = manufacture.schema.map(item => {
      const exsist = this.model.config.find(e => e.key === item.key);
      if (exsist) return exsist;
      else return new PreManufactureConfigItem(item.name, item.key);
    });
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      this.model.config = this.model.config.filter(i => i.value != null);
      const res = await this[this.model.id ? 'put' : 'post'](this.model);
      this.$router.push('/PreManufacture');
    } catch (e) {
      console.log('preManufacture edit error', e.response.data);
      if (e.response.data.statusCode === 400) this.alertAdd({ type: 'error', text: serverValidationErrorMessage(e.response.data.message) });
    }
  }

  public clear() {
    this.model = { id: this.model.id, config: [], categoryList: [] };
    this.$validator.reset();
  }
}
