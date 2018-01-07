import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ShopAction, ShopState } from '../../../store/modules/index';
import { ShopEntity } from '../../../../server/modules/shop/shop.entity';
import { TableHeader } from '../../../helpers/index';
import { app } from '../../../main';

@Component({ template: require('./RShop.list.pug') })
export class RShopList extends Vue {
  @ShopState list: ShopEntity[];
  headers: TableHeader<ShopEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    { value: 'name', text: 'Name' },
    { value: 'domain', text: 'Domain' },
    { value: 'port', text: 'Server port' },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => app.$router.push(`/shop/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => app.$router.push(`/shop/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @ShopAction delete;
  @ShopAction getList;
  async mounted() {
    await this.getList();
  }
}

