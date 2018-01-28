import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { DeliveryAction, DeliveryState, AuthGetter } from '../../../store/modules/index';
import { DeliveryEntity } from '../../../../server/modules/delivery/delivery.entity';
import { TableHeader } from '../../../helpers/index';
import { DeliveryStateEnumMap } from '../../../../server/modules/delivery/delivery.state.enum';

@Component({ template: require('./RDelivery.list.pug') })
export class RDeliveryList extends Vue {
  @AuthGetter hasPermission;
  @DeliveryState list: DeliveryEntity[];
  headers: TableHeader<DeliveryEntity>[];

  @DeliveryAction delete;
  @DeliveryAction getList;

  created() {
    this.headers = [
      { value: 'price', text: 'Стоимость' },
      { value: 'deliveryPoint', text: 'Куда' },
      { value: 'deliveryHome', text: 'До дома', transformer: (e: DeliveryEntity) => e.deliveryHome ? 'да' : 'нет' },
      {
        value: 'state', text: 'Состояние', transformer: (e: DeliveryEntity) => {
          const state = DeliveryStateEnumMap.filter(item => item.id === e.state)[0];
          return state ? state.name : 'ОШИБКА!';
        }
      },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/Delivery/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/Delivery/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

