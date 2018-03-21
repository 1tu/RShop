import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { RejectionEntity } from '../../../../server/modules/rejection/rejection.entity';
import { RejectionReasonEnumMap } from '../../../../server/modules/rejection/rejection.reason.enum';
import { serverValidationErrorMessage } from '../../../helpers/error';
import { Mutation } from '../../../store';
import { RejectionAction } from '../../../store/modules';

@Component({
  template: require('./RRejection.edit.pug')
})
export class RRejectionEdit extends Vue {
  @Prop() onSubmit: (model: RejectionEntity) => void;
  @Prop() id: number;

  public model: Partial<RejectionEntity> = {};
  public reasonList = RejectionReasonEnumMap;

  @Mutation alertAdd;
  @RejectionAction get;
  @RejectionAction put;
  @RejectionAction post;
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
      else this.$router.push('/Rejection');
    } catch (e) {
      console.log('rejection edit error', e.response.data);
      if (e.response.data.statusCode === 400) this.alertAdd({ type: 'error', text: serverValidationErrorMessage(e.response.data.message) });
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}
