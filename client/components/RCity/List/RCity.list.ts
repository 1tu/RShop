import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CityAction, CityState, AuthGetter } from '../../../store/modules/index';
import { CityEntity } from '../../../../server/modules/city/city.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RCity.list.pug') })
export class RCityList extends Vue {
  @AuthGetter hasPermission;
  @CityState list: CityEntity[];
  headers: TableHeader<CityEntity>[];

  @CityAction delete;
  @CityAction getList;

  created() {
    this.headers = [
      { value: 'name', text: 'Name' },
      { value: 'population', text: 'Population' },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/City/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/City/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

