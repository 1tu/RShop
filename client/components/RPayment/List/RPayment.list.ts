import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { PaymentAction, PaymentState } from '../../../store/modules/index';
import { PaymentEntity } from '../../../../server/modules/payment/payment.entity';
import { TableHeader } from '../../../helpers/index';
import { app } from '../../../main';
import { PaymentStateEnumMap } from '../../../../server/modules/payment/payment.state.enum';
import { CurrencyEnumMap } from '../../../../@types/enum/currency.enum';

@Component({ template: require('./RPayment.list.pug') })
export class RPaymentList extends Vue {
  @PaymentState list: PaymentEntity[];
  headers: TableHeader<PaymentEntity>[] = [
    { text: 'Сервис', transformer: (e: PaymentEntity) => e.paymentService.name, sortable: false },
    {
      value: 'currencyCode', text: 'Валюта', transformer: (e: PaymentEntity) => {
        const currencyCode = CurrencyEnumMap.filter(item => item.id === e.currencyCode)[0];
        return currencyCode ? currencyCode.name : 'ОШИБКА!';
      }
    },
    { value: 'amount', text: 'Сумма' },
    {
      value: 'state', text: 'Состояние', transformer: (e: PaymentEntity) => {
        const state = PaymentStateEnumMap.filter(item => item.id === e.state)[0];
        return state ? state.name : 'ОШИБКА!';
      }
    },
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

