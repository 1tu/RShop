import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UserAction, UserGetter } from '../../../store/modules/index';
import { UserEntity } from '../../../../server/modules/user/user.entity';
import { cloneDeep } from 'lodash';

@Component({
  template: require('./RUser.edit.pug'),
})
export class RUserEdit extends Vue {
  public model: Partial<UserEntity> = {};

  @UserAction get;
  @UserAction put;
  @UserAction post;
  async mounted() {
    const id = parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    }
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      await this[this.model.id ? 'put' : 'post'](this.model);
      this.$router.push('/user');
    } catch (e) {
      console.log('user edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

