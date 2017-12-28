import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { OrderAction, OrderState } from '../../../store/modules/index';
import { OrderEntity } from '../../../../server/modules/order/order.entity';
import { TableHeader } from '../../../helpers/index';
import { app } from '../../../main';

@Component({ template: require('./ROrder.list.pug') })
export class ROrderList extends Vue {
  @OrderState list: OrderEntity[];
  headers: TableHeader<OrderEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => app.$router.push(`/order/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => app.$router.push(`/order/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @OrderAction delete;
  @OrderAction getList;
  async mounted() {
    await this.getList();
  }
}

