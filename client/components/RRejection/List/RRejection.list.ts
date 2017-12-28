import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { RejectionAction, RejectionState } from '../../../store/modules/index';
import { RejectionEntity } from '../../../../server/modules/rejection/rejection.entity';
import { TableHeader } from '../../../helpers/index';
import { app } from '../../../main';

@Component({ template: require('./RRejection.list.pug') })
export class RRejectionList extends Vue {
  @RejectionState list: RejectionEntity[];
  headers: TableHeader<RejectionEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => app.$router.push(`/rejection/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => app.$router.push(`/rejection/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @RejectionAction delete;
  @RejectionAction getList;
  async mounted() {
    await this.getList();
  }
}

