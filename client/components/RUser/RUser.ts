import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UserAction, UserState } from '../../store/modules/index';
import { UserEntity } from '../../../server/modules/user/user.entity';

@Component({
  template: require('./RUser.pug')
})
export class RUser extends Vue {
  @UserState item: Partial<UserEntity>;

  @UserAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

