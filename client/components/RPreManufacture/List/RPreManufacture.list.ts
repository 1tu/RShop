import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { PreManufactureEntity } from '../../../../server/modules/preManufacture/preManufacture.entity';
import { TableHeader } from '../../../helpers';
import { AuthGetter, PreManufactureAction, PreManufactureState } from '../../../store/modules';

@Component({ template: require('./RPreManufacture.list.pug') })
export class RPreManufactureList extends Vue {
  @AuthGetter hasPermission;
  @PreManufactureState list: PreManufactureEntity[];
  headers: TableHeader<PreManufactureEntity>[];

  @PreManufactureAction delete;
  @PreManufactureAction getList;

  created() {
    this.headers = [
      { value: 'name', text: 'Название' },
      { value: 'description', text: 'Описание' },
      { text: 'Свойства', transformer: (e: PreManufactureEntity) => e.config.map(item => `${item.key} - ${item.value}`).join(', '), sortable: false },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/PreManufacture/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/PreManufacture/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}
