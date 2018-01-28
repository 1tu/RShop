import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ShopAction, ShopState, AuthGetter } from '../../../store/modules/index';
import { ShopEntity } from '../../../../server/modules/shop/shop.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RShop.list.pug') })
export class RShopList extends Vue {
  @AuthGetter hasPermission;
  @ShopState list: ShopEntity[];
  headers: TableHeader<ShopEntity>[];

  @ShopAction delete;
  @ShopAction getList;

  created() {
    this.headers = [
      { value: 'name', text: 'Name' },
      { value: 'host', text: 'Host' },
      { value: 'port', text: 'Server port' },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/Shop/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/Shop/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

