import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ContactAction, ContactState } from '../../store/modules/index';
import { ContactEntity } from '../../../server/modules/contact/contact.entity';

@Component({
  template: require('./RContact.pug')
})
export class RContact extends Vue {
  @ContactState item: Partial<ContactEntity>;

  @ContactAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

