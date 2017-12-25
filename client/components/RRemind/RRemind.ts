import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { RemindAction, RemindState } from '../../store/modules/index';
import { RemindEntity } from '../../../server/modules/remind/remind.entity';

@Component({
  template: require('./RRemind.pug')
})
export class RRemind extends Vue {
  @RemindState item: Partial<RemindEntity>;

  @RemindAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

