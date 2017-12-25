import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { RemindAction, RemindState } from '../../../store/modules/index';
import { RemindEntity } from '../../../../server/modules/remind/remind.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RRemind.list.pug') })
export class RRemindList extends Vue {
  @RemindState list: RemindEntity[];
  headers: TableHeader<RemindEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => this._routeTo(`/remind/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => this._routeTo(`/remind/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @RemindAction delete;
  @RemindAction getList;
  async mounted() {
    await this.getList();
  }

  private _routeTo(path) {
    this.$router.push(path);
  }
}

