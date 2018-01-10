import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { RejectionAction, RejectionGetter } from '../../../store/modules/index';
import { RejectionEntity } from '../../../../server/modules/rejection/rejection.entity';
import { cloneDeep } from 'lodash';
import { RejectionReasonEnumMap } from '../../../../server/modules/rejection/rejection.reason.enum';

@Component({
  template: require('./RRejection.edit.pug'),
})
export class RRejectionEdit extends Vue {
  public model: Partial<RejectionEntity> = {};
  public reasonList = RejectionReasonEnumMap;

  @RejectionAction get;
  @RejectionAction put;
  @RejectionAction post;
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
      this.$router.push('/rejection');
    } catch (e) {
      console.log('rejection edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

