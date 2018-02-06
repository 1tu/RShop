import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ManufactureAction, ProductState, ProductAction } from '../../../store/modules/index';
import { ManufactureEntity } from '../../../../server/modules/manufacture/manufacture.entity';
import { cloneDeep } from 'lodash';
import { ManufactureSchemaTypesMap, ManufactureSchemaItem, ManufactureSchemaOption } from '../../../../server/modules/manufacture/manufacture.schema';

@Component({
  template: require('./RManufacture.edit.pug'),
})
export class RManufactureEdit extends Vue {
  public model: Partial<ManufactureEntity> = { schema: [] };
  public schemaTypeList = ManufactureSchemaTypesMap;
  @ProductState('list') productList;

  @ManufactureAction get;
  @ManufactureAction put;
  @ManufactureAction post;
  @ProductAction('getList') getListProduct;

  async mounted() {
    this.getListProduct();
    const id = parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    }
  }

  public addSchemaItem() {
    this.model.schema.push(new ManufactureSchemaItem());
  }
  public removeSchemaItem(schemaItem) {
    this.model.schema.splice(this.model.schema.indexOf(schemaItem), 1);
  }

  public addOption(schemaItem: ManufactureSchemaItem) {
    schemaItem.optionList.push(new ManufactureSchemaOption());
  }

  public removeOption(schemaItem: ManufactureSchemaItem, option) {
    schemaItem.optionList.splice(schemaItem.optionList.indexOf(option), 1);
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      await this[this.model.id ? 'put' : 'post'](this.model);
      this.$router.push('/Manufacture');
    } catch (e) {
      console.log('manufacture edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id, schema: [] };
    this.$validator.reset();
  }
}

