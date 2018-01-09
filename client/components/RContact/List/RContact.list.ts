import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ContactAction, ContactState } from '../../../store/modules/index';
import { ContactEntity } from '../../../../server/modules/contact/contact.entity';
import { TableHeader } from '../../../helpers/index';
import { app } from '../../../main';

@Component({ template: require('./RContact.list.pug') })
export class RContactList extends Vue {
  @ContactState list: ContactEntity[];
  headers: TableHeader<ContactEntity>[] = [
    { text: 'Клиент', transformer: (e: ContactEntity) => `${e.customer.nameLast} ${e.customer.nameFirst} (${e.customer.phone})`, sortable: false },
    { value: 'log', text: 'Лог' },
    { value: 'result', text: 'Результат' },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => app.$router.push(`/contact/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => app.$router.push(`/contact/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @ContactAction delete;
  @ContactAction getList;
  async mounted() {
    await this.getList();
  }
}

