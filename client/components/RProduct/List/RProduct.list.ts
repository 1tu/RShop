import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ProductAction, ProductState } from '../../../store/modules/index';
import { ProductEntity } from '../../../../server/modules/product/product.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RProduct.list.pug') })
export class RProductList extends Vue {
  @ProductState list: ProductEntity[];
  headers: TableHeader<ProductEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: (id: number) => this._routeTo(`/product/${id}`) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => this._routeTo(`/product/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @ProductAction delete;
  @ProductAction getList;
  async mounted() {
    await this.getList();
  }

  private _routeTo(path) {
    this.$router.push(path);
  }
}

