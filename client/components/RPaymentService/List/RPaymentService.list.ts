import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { PaymentServiceAction, PaymentServiceState } from '../../../store/modules/index';
import { PaymentServiceEntity } from '../../../../server/modules/paymentService/paymentService.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RPaymentService.list.pug') })
export class RPaymentServiceList extends Vue {
  @PaymentServiceState list: PaymentServiceEntity[];
  headers: TableHeader<PaymentServiceEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => this._routeTo(`/paymentService/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => this._routeTo(`/paymentService/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @PaymentServiceAction delete;
  @PaymentServiceAction getList;
  async mounted() {
    await this.getList();
  }

  private _routeTo(path) {
    this.$router.push(path);
  }
}

