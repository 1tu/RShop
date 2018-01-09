import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CustomerAction, CustomerState } from '../../../store/modules/index';
import { CustomerEntity } from '../../../../server/modules/customer/customer.entity';
import { TableHeader } from '../../../helpers/index';
import { app } from '../../../main';

@Component({ template: require('./RCustomer.list.pug') })
export class RCustomerList extends Vue {
  @CustomerState list: CustomerEntity[];
  headers: TableHeader<CustomerEntity>[] = [
    { text: 'ФИО', transformer: (e: CustomerEntity) => `${e.nameLast} ${e.nameFirst} ${e.nameSecond}`, sortable: false },
    { value: 'phone', text: 'Тел.' },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => app.$router.push(`/customer/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => app.$router.push(`/customer/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @CustomerAction delete;
  @CustomerAction getList;
  async mounted() {
    await this.getList();
  }
}

