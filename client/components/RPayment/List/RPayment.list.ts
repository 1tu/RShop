import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { PaymentAction, PaymentState, AuthGetter } from '../../../store/modules/index';
import { PaymentEntity } from '../../../../server/modules/payment/payment.entity';
import { TableHeader } from '../../../helpers/index';
import { PaymentStateEnumMap } from '../../../../server/modules/payment/payment.state.enum';
import { CurrencyEnumMap } from '../../../../shared/enum/currency.enum';

@Component({ template: require('./RPayment.list.pug') })
export class RPaymentList extends Vue {
  @AuthGetter hasPermission;
  @PaymentState list: PaymentEntity[];
  headers: TableHeader<PaymentEntity>[];

  @PaymentAction delete;
  @PaymentAction getList;

  created() {
    this.headers = [
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
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/Payment/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/Payment/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

