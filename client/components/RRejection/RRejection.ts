import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { RejectionAction, RejectionState } from '../../store/modules/index';
import { RejectionEntity } from '../../../server/modules/rejection/rejection.entity';

@Component({
  template: require('./RRejection.pug')
})
export class RRejection extends Vue {
  @RejectionState item: Partial<RejectionEntity>;

  @RejectionAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

