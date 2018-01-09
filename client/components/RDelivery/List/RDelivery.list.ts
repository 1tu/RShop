import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { DeliveryAction, DeliveryState } from '../../../store/modules/index';
import { DeliveryEntity } from '../../../../server/modules/delivery/delivery.entity';
import { TableHeader } from '../../../helpers/index';
import { app } from '../../../main';
import { DeliveryStateEnumMap } from '../../../../server/modules/delivery/delivery.state.enum';

@Component({ template: require('./RDelivery.list.pug') })
export class RDeliveryList extends Vue {
  @DeliveryState list: DeliveryEntity[];
  headers: TableHeader<DeliveryEntity>[] = [
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
        { name: 'info', icon: 'info', onClick: (id: number) => app.$router.push(`/delivery/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => app.$router.push(`/delivery/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @DeliveryAction delete;
  @DeliveryAction getList;
  async mounted() {
    await this.getList();
  }
}

