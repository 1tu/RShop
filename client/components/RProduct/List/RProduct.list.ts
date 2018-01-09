import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ProductAction, ProductState } from '../../../store/modules/index';
import { ProductEntity } from '../../../../server/modules/product/product.entity';
import { TableHeader } from '../../../helpers/index';
import { app } from '../../../main';
import { ProductProperty } from '../../../../server/modules/product/product.property';

@Component({ template: require('./RProduct.list.pug') })
export class RProductList extends Vue {
  @ProductState list: ProductEntity[];
  headers: TableHeader<ProductEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    { value: 'name', text: 'Название' },
    { text: 'Свойства', transformer: transformPropertyList, sortable: false },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => app.$router.push(`/product/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => app.$router.push(`/product/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @ProductAction delete;
  @ProductAction getList;
  async mounted() {
    await this.getList();
  }
}

function transformPropertyList(product: ProductEntity) {
  return product.propertyList.map(item => `${item.key} - ${item.value}`).join(', ');
}
