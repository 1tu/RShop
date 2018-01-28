import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ContactAction, ContactGetter, CustomerAction, CustomerState } from '../../../store/modules/index';
import { ContactEntity } from '../../../../server/modules/contact/contact.entity';
import { cloneDeep } from 'lodash';

@Component({
  template: require('./RContact.edit.pug'),
})
export class RContactEdit extends Vue {
  public model: Partial<ContactEntity> = {};
  @CustomerState('list') customerList;

  @ContactAction get;
  @ContactAction put;
  @ContactAction post;
  @CustomerAction('getList') getListCustomer;

  async mounted() {
    this.getListCustomer();
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
      this.$router.push('/Contact');
    } catch (e) {
      console.log('contact edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

