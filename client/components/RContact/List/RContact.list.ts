import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ContactAction, ContactState, AuthGetter } from '../../../store/modules/index';
import { ContactEntity } from '../../../../server/modules/contact/contact.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RContact.list.pug') })
export class RContactList extends Vue {
  @AuthGetter hasPermission;
  @ContactState list: ContactEntity[];
  headers: TableHeader<ContactEntity>[];

  @ContactAction delete;
  @ContactAction getList;

  created() {
    this.headers = [
      { text: 'Клиент', transformer: (e: ContactEntity) => `${e.customer.nameLast} ${e.customer.nameFirst} (${e.customer.phone})`, sortable: false },
      { value: 'log', text: 'Лог' },
      { value: 'result', text: 'Результат' },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/Contact/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/Contact/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

