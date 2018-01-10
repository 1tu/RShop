import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { RemindAction, RemindState } from '../../../store/modules/index';
import { RemindEntity } from '../../../../server/modules/remind/remind.entity';
import { TableHeader } from '../../../helpers/index';
import { app } from '../../../main';

@Component({ template: require('./RRemind.list.pug') })
export class RRemindList extends Vue {
  @RemindState list: RemindEntity[];
  headers: TableHeader<RemindEntity>[] = [
    { value: 'description', text: 'Описание' },
    { value: 'remindAt', text: 'Дата' },
    { value: 'isStopped', text: 'Отработано', transformer: (e: RemindEntity) => e.isStopped ? 'да' : 'нет' },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => app.$router.push(`/remind/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => app.$router.push(`/remind/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @RemindAction delete;
  @RemindAction getList;
  async mounted() {
    await this.getList();
  }
}

