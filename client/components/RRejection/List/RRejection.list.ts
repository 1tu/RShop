import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { RejectionAction, RejectionState, AuthGetter } from '../../../store/modules/index';
import { RejectionEntity } from '../../../../server/modules/rejection/rejection.entity';
import { TableHeader } from '../../../helpers/index';
import { RejectionReasonEnumMap } from '../../../../server/modules/rejection/rejection.reason.enum';

@Component({ template: require('./RRejection.list.pug') })
export class RRejectionList extends Vue {
  @AuthGetter hasPermission;
  @RejectionState list: RejectionEntity[];
  headers: TableHeader<RejectionEntity>[];

  @RejectionAction delete;
  @RejectionAction getList;

  created() {
    this.headers = [
      {
        value: 'reason', text: 'Причина', transformer: (e: RejectionEntity) => {
          const reason = RejectionReasonEnumMap.filter(item => item.id === e.reason)[0];
          return reason ? reason.name : 'ОШИБКА!';
        }
      },
      { value: 'description', text: 'Описание' },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/Rejection/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/Rejection/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

