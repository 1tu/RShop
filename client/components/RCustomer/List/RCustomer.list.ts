import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CustomerAction, CustomerState } from '../../../store/modules/index';
import { CustomerEntity } from '../../../../server/modules/customer/customer.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RCustomer.list.pug') })
export class RCustomerList extends Vue {
  @CustomerState list: CustomerEntity[];
  headers: TableHeader<CustomerEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => this._routeTo(`/customer/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => this._routeTo(`/customer/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @CustomerAction delete;
  @CustomerAction getList;
  async mounted() {
    await this.getList();
  }

  private _routeTo(path) {
    this.$router.push(path);
  }
}

