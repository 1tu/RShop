import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { PaymentAction, PaymentState } from '../../../store/modules/index';
import { PaymentEntity } from '../../../../server/modules/payment/payment.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RPayment.list.pug') })
export class RPaymentList extends Vue {
  @PaymentState list: PaymentEntity[];
  headers: TableHeader<PaymentEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => this._routeTo(`/payment/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => this._routeTo(`/payment/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @PaymentAction delete;
  @PaymentAction getList;
  async mounted() {
    await this.getList();
  }

  private _routeTo(path) {
    this.$router.push(path);
  }
}

