import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { OrderAction, OrderState, AuthGetter } from '../../../store/modules/index';
import { OrderEntity } from '../../../../server/modules/order/order.entity';
import { TableHeader } from '../../../helpers/index';
import { OrderStateEnumMap } from '../../../../server/modules/order/order.state.enum';

@Component({ template: require('./ROrder.list.pug') })
export class ROrderList extends Vue {
  @AuthGetter hasPermission;
  @OrderState list: OrderEntity[];
  headers: TableHeader<OrderEntity>[];

  @OrderAction delete;
  @OrderAction getList;

  created() {
    this.headers = [
      { text: 'Клиент', transformer: (e: OrderEntity) => `${e.customer.nameLast} ${e.customer.nameFirst} (${e.customer.phone})`, sortable: false },
      { value: 'price', text: 'Стоимость' },
      {
        value: 'state', text: 'Состояние', transformer: (e: OrderEntity) => {
          const state = OrderStateEnumMap.filter(item => item.id === e.state)[0];
          return state ? state.name : 'ОШИБКА!';
        }
      },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/order/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/order/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      }
    ];
  }

  async mounted() {
    await this.getList();
  }
}

