import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { PaymentServiceAction, PaymentServiceState, AuthGetter } from '../../../store/modules/index';
import { PaymentServiceEntity } from '../../../../server/modules/paymentService/paymentService.entity';
import { TableHeader } from '../../../helpers/index';
import { PaymentServiceTaxTypeEnumMap } from '../../../../server/modules/paymentService/paymentService.taxType.enum';

@Component({ template: require('./RPaymentService.list.pug') })
export class RPaymentServiceList extends Vue {
  @AuthGetter hasPermission;
  @PaymentServiceState list: PaymentServiceEntity[];
  headers: TableHeader<PaymentServiceEntity>[];

  @PaymentServiceAction delete;
  @PaymentServiceAction getList;

  created() {
    this.headers = [
      { value: 'name', text: 'Название' },
      { value: 'tax', text: 'Комиссия' },
      {
        value: 'taxType', text: 'Тип комиссии', transformer: (e: PaymentServiceEntity) => {
          const taxType = PaymentServiceTaxTypeEnumMap.filter(item => item.id === e.taxType)[0];
          return taxType ? taxType.name : 'ОШИБКА!';
        }
      },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/paymentService/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/paymentService/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

