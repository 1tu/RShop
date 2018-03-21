import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { SeoMetaEntity } from '../../../../server/modules/seoMeta/seoMeta.entity';
import { ShopEntity } from '../../../../server/modules/shop/shop.entity';
import { CityAction, CityState, SeoMetaAction, SeoMetaMutation, SeoMetaState, ShopAction } from '../../../store/modules';
import { RSeoMetaEdit } from '../../RSeoMeta';
import { RSeoTemplateEdit } from '../../RSeoTemplate';
import { serverValidationErrorMessage } from '../../../helpers/error';
import { Mutation } from '../../../store';

@Component({
  template: require('./RShop.edit.pug'),
  components: { RSeoMetaEdit }
})
export class RShopEdit extends Vue {
  @Prop() onSubmit: (model: ShopEntity) => void;
  @Prop() id: number;

  public model: Partial<ShopEntity> = {};
  public dialogSeoMeta = false;
  @Mutation alertAdd;
  @CityState('list') cityList;
  @SeoMetaState('list') seoMetaList;

  @ShopAction get;
  @ShopAction put;
  @ShopAction post;
  @CityAction('getList') getListCity;
  @SeoMetaAction('getList') getListSeoMeta;

  @SeoMetaMutation('listAdd') listAddSeoMeta;

  async mounted() {
    this.getListCity();
    this.getListSeoMeta();
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

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      this.model.cityList = this.model.cityList.map(item => ({ id: item.id })) as any;
      const res = await this[this.model.id ? 'put' : 'post'](this.model);
      if (this.onSubmit) this.onSubmit(res);
      else this.$router.push('/Shop');
    } catch (e) {
      console.log('shop edit error', e.response.data);
      if (e.response.data.statusCode === 400) this.alertAdd({ type: 'error', text: serverValidationErrorMessage(e.response.data.message) });
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}
