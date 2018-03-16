import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { PreManufactureConfigItem } from '../../../../server/modules/preManufacture/preManufacture.configItem';
import { PreManufactureEntity } from '../../../../server/modules/preManufacture/preManufacture.entity';
import { PreManufactureAction, ShopAction, ShopState, ManufactureAction, ManufactureState } from '../../../store/modules';
import { OrderProductEntity } from '../../../../server/modules/order_product/order_product.entity';
import { ProductEntity } from '../../../../server/modules/product/product.entity';
import { ManufactureEntity } from '../../../../server/modules/manufacture/manufacture.entity';

@Component({
  template: require('./RPreManufacture.edit.pug'),
})
export class RPreManufactureEdit extends Vue {
  public model: Partial<PreManufactureEntity> = { config: [] };
  @ManufactureState('list') manufactureList;

  @PreManufactureAction get;
  @PreManufactureAction put;
  @PreManufactureAction post;
  @ManufactureAction('getList') getListManufacture;

  async mounted() {
    this.getListManufacture();
    const id = parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
      this.onSelectManufacture(this.model.manufacture);
    }
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
      await this[this.model.id ? 'put' : 'post'](this.model);
      this.$router.push('/PreManufacture');
    } catch (e) {
      console.log('preManufacture edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id, config: [] };
    this.$validator.reset();
  }
}

