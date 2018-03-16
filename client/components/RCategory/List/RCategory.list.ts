import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CategoryAction, CategoryState, AuthGetter } from '../../../store/modules/index';
import { CategoryEntity } from '../../../../server/modules/category/category.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RCategory.list.pug') })
export class RCategoryList extends Vue {
  @AuthGetter hasPermission;
  @CategoryState list: CategoryEntity[];
  headers: TableHeader<CategoryEntity>[];

  @CategoryAction delete;
  @CategoryAction getList;

  created() {
    this.headers = [
      { value: 'name', text: 'Name' },
      { value: 'nameTranslit', text: 'Name translit' },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/Category/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/Category/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

