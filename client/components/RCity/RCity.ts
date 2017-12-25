import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CityAction, CityState } from '../../store/modules/index';
import { CityEntity } from '../../../server/modules/city/city.entity';

@Component({
  template: require('./RCity.pug')
})
export class RCity extends Vue {
  @CityState item: Partial<CityEntity>;

  @CityAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

