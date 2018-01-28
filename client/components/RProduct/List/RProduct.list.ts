import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ProductAction, ProductState, AuthGetter } from '../../../store/modules/index';
import { ProductEntity } from '../../../../server/modules/product/product.entity';
import { TableHeader } from '../../../helpers/index';
import { ProductProperty } from '../../../../server/modules/product/product.property';

@Component({ template: require('./RProduct.list.pug') })
export class RProductList extends Vue {
  @AuthGetter hasPermission;
  @ProductState list: ProductEntity[];
  headers: TableHeader<ProductEntity>[];

  @ProductAction delete;
  @ProductAction getList;

  created() {
    this.headers = [
      { value: 'name', text: 'Название' },
      { text: 'Свойства', transformer: (e: ProductEntity) => e.propertyList.map(item => `${item.key} - ${item.value}`).join(', '), sortable: false },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/Product/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/Product/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}
