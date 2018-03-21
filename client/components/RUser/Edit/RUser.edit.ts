import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { UserEntity } from '../../../../server/modules/user/user.entity';
import { UserAction } from '../../../store/modules';
import { serverValidationErrorMessage } from '../../../helpers/error';
import { Mutation } from '../../../store';

@Component({
  template: require('./RUser.edit.pug')
})
export class RUserEdit extends Vue {
  @Prop() onSubmit: (model: UserEntity) => void;
  @Prop() id: number;

  public model: Partial<UserEntity> = {};
  @Mutation alertAdd;
  @UserAction get;
  @UserAction put;
  @UserAction post;
  async mounted() {
    const id = this.id != null ? this.id : parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    }
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      const res = await this[this.model.id ? 'put' : 'post'](this.model);
      if (this.onSubmit) this.onSubmit(res);
      else this.$router.push('/user');
    } catch (e) {
      console.log('user edit error', e.response.data);
      if (e.response.data.statusCode === 400) this.alertAdd({ type: 'error', text: serverValidationErrorMessage(e.response.data.message) });
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}
