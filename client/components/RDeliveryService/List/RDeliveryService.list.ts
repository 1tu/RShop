import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { DeliveryServiceAction, DeliveryServiceState, AuthGetter } from '../../../store/modules/index';
import { DeliveryServiceEntity } from '../../../../server/modules/deliveryService/deliveryService.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RDeliveryService.list.pug') })
export class RDeliveryServiceList extends Vue {
  @AuthGetter hasPermission;
  @DeliveryServiceState list: DeliveryServiceEntity[];
  headers: TableHeader<DeliveryServiceEntity>[];

  @DeliveryServiceAction delete;
  @DeliveryServiceAction getList;

  created() {
    this.headers = [
      { value: 'name', text: 'Название' },
      { value: 'adapter', text: 'Адаптер' },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/deliveryService/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/deliveryService/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

