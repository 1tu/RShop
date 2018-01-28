import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { OrderAction, OrderGetter, ShopState, ShopAction, CustomerState, CustomerAction, ProductState, ProductAction } from '../../../store/modules/index';
import { OrderEntity } from '../../../../server/modules/order/order.entity';
import { cloneDeep } from 'lodash';
import { OrderStateEnumMap } from '../../../../server/modules/order/order.state.enum';
import { ManufactureEntity } from '../../../../server/modules/manufacture/manufacture.entity';
import { OrderProductEntity } from '../../../../server/modules/order_product/order_product.entity';
import { ManufactureConfigItem } from '../../../../server/modules/manufacture/manufacture.config';
import { ProductEntity } from '../../../../server/modules/product/product.entity';
import { ManufactureSchemaItem } from '../../../../server/modules/manufacture/manufacture.schema';
import { setTimeout } from 'timers';

@Component({
  template: require('./ROrder.edit.pug'),
})
export class ROrderEdit extends Vue {
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
    const id = parseInt(this.$route.params.id);
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
    return manufacture.schema.map(item => ({
      name: item.name,
      key: item.key,
      value: null,
    }));
  }

  public update() {
    setTimeout(() => this.$forceUpdate(), 0);
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      await this[this.model.id ? 'put' : 'post'](this.model);
      this.$router.push('/Order');
    } catch (e) {
      console.log('order edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id, productList: [] };
    this.$validator.reset();
  }
}

