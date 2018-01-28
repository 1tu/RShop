import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { RemindAction, RemindState, AuthGetter } from '../../../store/modules/index';
import { RemindEntity } from '../../../../server/modules/remind/remind.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RRemind.list.pug') })
export class RRemindList extends Vue {
  @AuthGetter hasPermission;
  @RemindState list: RemindEntity[];
  headers: TableHeader<RemindEntity>[];

  @RemindAction delete;
  @RemindAction getList;

  created() {
    this.headers = [
      { value: 'description', text: 'Описание' },
      { value: 'remindAt', text: 'Дата' },
      { value: 'isStopped', text: 'Отработано', transformer: (e: RemindEntity) => e.isStopped ? 'да' : 'нет' },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/Remind/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/Remind/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

