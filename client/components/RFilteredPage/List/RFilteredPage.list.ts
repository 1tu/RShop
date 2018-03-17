import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { FilteredPageAction, FilteredPageState, AuthGetter } from '../../../store/modules/index';
import { FilteredPageEntity } from '../../../../server/modules/filteredPage/filteredPage.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RFilteredPage.list.pug') })
export class RFilteredPageList extends Vue {
  @AuthGetter hasPermission;
  @FilteredPageState list: FilteredPageEntity[];
  headers: TableHeader<FilteredPageEntity>[];

  @FilteredPageAction delete;
  @FilteredPageAction getList;

  created() {
    this.headers = [
      { value: 'name', text: 'Name' },
      { value: 'url', text: 'Url' },
      {
        text: 'Filters', sortable: false,
        transformer: (e: FilteredPageEntity) => `Категории: ${e.filters.categoryIdList.join(', ')}; Свойства: ${e.filters.propertyKeyList.join(', ')}`
      },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/FilteredPage/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/FilteredPage/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

