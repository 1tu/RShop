import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { RemindEntity } from '../../../../server/modules/remind/remind.entity';
import { RemindAction } from '../../../store/modules';

@Component({
  template: require('./RRemind.edit.pug'),
})
export class RRemindEdit extends Vue {
  @Prop() onSubmit: (model: RemindEntity) => void;
  @Prop() id: number;

  public datePicker = false;

  public model: Partial<RemindEntity> = {};

  @RemindAction get;
  @RemindAction put;
  @RemindAction post;
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
      else this.$router.push('/Remind');
    } catch (e) {
      console.log('remind edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

