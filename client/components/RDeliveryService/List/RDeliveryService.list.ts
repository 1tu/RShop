import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { DeliveryServiceAction, DeliveryServiceState } from '../../../store/modules/index';
import { DeliveryServiceEntity } from '../../../../server/modules/deliveryService/deliveryService.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RDeliveryService.list.pug') })
export class RDeliveryServiceList extends Vue {
  @DeliveryServiceState list: DeliveryServiceEntity[];
  headers: TableHeader<DeliveryServiceEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => this._routeTo(`/deliveryService/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => this._routeTo(`/deliveryService/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @DeliveryServiceAction delete;
  @DeliveryServiceAction getList;
  async mounted() {
    await this.getList();
  }

  private _routeTo(path) {
    this.$router.push(path);
  }
}

