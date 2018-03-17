import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ManufactureAction, ManufactureState, AuthGetter } from '../../../store/modules/index';
import { ManufactureEntity } from '../../../../server/modules/manufacture/manufacture.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RManufacture.list.pug') })
export class RManufactureList extends Vue {
  @AuthGetter hasPermission;
  @ManufactureState list: ManufactureEntity[];
  headers: TableHeader<ManufactureEntity>[];

  @ManufactureAction delete;
  @ManufactureAction getList;

  created() {
    this.headers = [
      { text: 'Продукт', transformer: (e: ManufactureEntity) => e.product.name, sortable: false },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/Manufacture/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/Manufacture/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

