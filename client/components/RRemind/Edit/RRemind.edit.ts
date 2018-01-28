import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { RemindAction, RemindGetter } from '../../../store/modules/index';
import { RemindEntity } from '../../../../server/modules/remind/remind.entity';
import { cloneDeep } from 'lodash';

@Component({
  template: require('./RRemind.edit.pug'),
})
export class RRemindEdit extends Vue {
  public model: Partial<RemindEntity> = {};

  @RemindAction get;
  @RemindAction put;
  @RemindAction post;
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
      this.$router.push('/Remind');
    } catch (e) {
      console.log('remind edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

