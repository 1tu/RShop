import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { ManufactureEntity } from '../../../../server/modules/manufacture/manufacture.entity';
import { PreManufactureConfigItem } from '../../../../server/modules/preManufacture/preManufacture.configItem';
import { PreManufactureEntity } from '../../../../server/modules/preManufacture/preManufacture.entity';
import { ManufactureAction, ManufactureState, PreManufactureAction } from '../../../store/modules';

@Component({
  template: require('./RPreManufacture.edit.pug'),
})
export class RPreManufactureEdit extends Vue {
  @Prop() onSubmit: (model: PreManufactureEntity) => void;
  @Prop() id: number;

  public model: Partial<PreManufactureEntity> = { config: [] };
  @ManufactureState('list') manufactureList;

  @PreManufactureAction get;
  @PreManufactureAction put;
  @PreManufactureAction post;
  @ManufactureAction('getList') getListManufacture;

  async mounted() {
    this.getListManufacture();
    const id = this.id != null ? this.id : parseInt(this.$route.params.id);
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
      const res = await this[this.model.id ? 'put' : 'post'](this.model);
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

