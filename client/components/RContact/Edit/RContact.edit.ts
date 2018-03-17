import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { ContactEntity } from '../../../../server/modules/contact/contact.entity';
import { ContactAction, CustomerAction, CustomerState } from '../../../store/modules';

@Component({
  template: require('./RContact.edit.pug'),
})
export class RContactEdit extends Vue {
  @Prop() onSubmit: (model: ContactEntity) => void;
  @Prop() id: number;

  public model: Partial<ContactEntity> = {};
  @CustomerState('list') customerList;

  @ContactAction get;
  @ContactAction put;
  @ContactAction post;
  @CustomerAction('getList') getListCustomer;

  async mounted() {
    this.getListCustomer();
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
      else this.$router.push('/Contact');
    } catch (e) {
      console.log('contact edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

