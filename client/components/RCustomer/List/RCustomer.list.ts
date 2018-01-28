import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CustomerAction, CustomerState, AuthGetter } from '../../../store/modules/index';
import { CustomerEntity } from '../../../../server/modules/customer/customer.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RCustomer.list.pug') })
export class RCustomerList extends Vue {
  @AuthGetter hasPermission;
  @CustomerState list: CustomerEntity[];
  headers: TableHeader<CustomerEntity>[];

  @CustomerAction delete;
  @CustomerAction getList;

  created() {
    this.headers = [
      { text: 'ФИО', transformer: (e: CustomerEntity) => `${e.nameLast} ${e.nameFirst} ${e.nameSecond}`, sortable: false },
      { value: 'phone', text: 'Тел.' },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/Customer/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/Customer/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

