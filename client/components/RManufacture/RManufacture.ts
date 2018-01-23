import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ManufactureAction, ManufactureState } from '../../store/modules/index';
import { ManufactureEntity } from '../../../server/modules/manufacture/manufacture.entity';

@Component({
  template: require('./RManufacture.pug')
})
export class RManufacture extends Vue {
  @ManufactureState item: Partial<ManufactureEntity>;

  @ManufactureAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

