import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { PreManufactureAction, PreManufactureState } from '../../store/modules/index';
import { PreManufactureEntity } from '../../../server/modules/preManufacture/preManufacture.entity';

@Component({
  template: require('./RPreManufacture.pug')
})
export class RPreManufacture extends Vue {
  @PreManufactureState item: Partial<PreManufactureEntity>;

  @PreManufactureAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

