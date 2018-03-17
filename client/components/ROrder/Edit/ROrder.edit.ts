import { cloneDeep } from 'lodash';
import { setTimeout } from 'timers';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { ManufactureConfigItem } from '../../../../server/modules/manufacture/manufacture.config';
import { ManufactureEntity } from '../../../../server/modules/manufacture/manufacture.entity';
import { ManufactureSchemaItem } from '../../../../server/modules/manufacture/manufacture.schema';
import { OrderEntity } from '../../../../server/modules/order/order.entity';
import { OrderStateEnumMap } from '../../../../server/modules/order/order.state.enum';
import { OrderProductEntity } from '../../../../server/modules/order_product/order_product.entity';
import { ProductEntity } from '../../../../server/modules/product/product.entity';
import {
  CustomerAction,
  CustomerState,
  OrderAction,
  ProductAction,
  ProductState,
  ShopAction,
  ShopState,
} from '../../../store/modules';

@Component({
  template: require('./ROrder.edit.pug'),
})
export class ROrderEdit extends Vue {
  @Prop() onSubmit: (model: OrderEntity) => void;
  @Prop() id: number;

  public model: Partial<OrderEntity> = { productList: [{ count: 1 } as any] };
  public stateList = OrderStateEnumMap;
  @ShopState('list') shopList;
  @CustomerState('list') customerList;
  @ProductState('list') productList;
  // TODO: добавить создание Rejection \ Delivery \ Payment's

  @OrderAction get;
  @OrderAction put;
  @OrderAction post;
  @ShopAction('getList') getListShop;
  @CustomerAction('getList') getListCustomer;
  @ProductAction('getList') getListProduct;

  async mounted() {
    this.getListProduct();
    const id = this.id != null ? this.id : parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    } else {
      this.getListShop();
      this.getListCustomer();
    }
  }

  public addProduct() {
    this.model.productList.push({ count: 1 } as any);
  }
  public removeProduct(product) {
    if (this.model.productList.length <= 1) return;
    this.model.productList.splice(this.model.productList.indexOf(product), 1);
  }

  public onSelectProduct(productItem: OrderProductEntity, product: ProductEntity) {
    if (product.manufacture) {
      productItem.config = this._makeConfig(product.manufacture);
    } else {
      delete productItem.config;
    }
  }

  public makeSchemaValueList(schemaItem: ManufactureSchemaItem) {
    return schemaItem.optionList.map(opt => ({ name: opt.name, value: opt.value }));
  }

  private _makeConfig(manufacture: ManufactureEntity): ManufactureConfigItem[] {
    return manufacture.schema.map(item => new ManufactureConfigItem(item.name, item.key));
  }

  public update() {
    setTimeout(() => this.$forceUpdate(), 0);
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      const res = await this[this.model.id ? 'put' : 'post'](this.model);
      if (this.onSubmit) this.onSubmit(res);
      else this.$router.push('/Order');
    } catch (e) {
      console.log('order edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id, productList: [] };
    this.$validator.reset();
  }
}

