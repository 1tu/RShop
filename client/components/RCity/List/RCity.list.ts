import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CityAction, CityState } from '../../../store/modules/index';
import { CityEntity } from '../../../../server/modules/city/city.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RCity.list.pug') })
export class RCityList extends Vue {
  @CityState list: CityEntity[];
  headers: TableHeader<CityEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => this._routeTo(`/city/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => this._routeTo(`/city/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @CityAction delete;
  @CityAction getList;
  async mounted() {
    await this.getList();
  }

  private _routeTo(path) {
    this.$router.push(path);
  }
}

