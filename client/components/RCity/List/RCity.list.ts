import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CityAction, CityState } from '../../../store/modules/index';
import { CityEntity } from '../../../../server/modules/city/city.entity';
import { TableHeader } from '../../../helpers/index';
import { app } from '../../../main';

@Component({ template: require('./RCity.list.pug') })
export class RCityList extends Vue {
  @CityState list: CityEntity[];
  headers: TableHeader<CityEntity>[] = [
    { value: 'name', text: 'Name' },
    { value: 'population', text: 'Population' },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => app.$router.push(`/city/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => app.$router.push(`/city/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @CityAction delete;
  @CityAction getList;
  async mounted() {
    await this.getList();
  }
}

