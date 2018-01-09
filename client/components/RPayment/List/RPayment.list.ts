import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { PaymentAction, PaymentState } from '../../../store/modules/index';
import { PaymentEntity } from '../../../../server/modules/payment/payment.entity';
import { TableHeader } from '../../../helpers/index';
import { app } from '../../../main';

@Component({ template: require('./RPayment.list.pug') })
export class RPaymentList extends Vue {
  @PaymentState list: PaymentEntity[];
  headers: TableHeader<PaymentEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => app.$router.push(`/payment/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => app.$router.push(`/payment/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @PaymentAction delete;
  @PaymentAction getList;
  async mounted() {
    await this.getList();
  }
}
