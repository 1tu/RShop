import { Body, Controller, Get, HttpStatus, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { DeepPartial } from 'typeorm/common/DeepPartial';

import { makeEvent } from '../../../shared/Gateway.shared';
import { EventGateway } from '../../common/gateway/event.gateway';
import { ApiGuard } from '../../guards/api.guard';
import { CategoryService } from '../category/category.service';
import { CityService } from '../city/city.service';
import { CustomerPostDto } from '../customer/customer.dto';
import { CustomerService } from '../customer/customer.service';
import { DeliveryStateEnum } from '../delivery/delivery.state.enum';
import { DeliveryServiceService } from '../deliveryService/deliveryService.service';
import { FilteredPageService } from '../filteredPage/filteredPage.service';
import { ManufactureSchemaTypes } from '../manufacture/manufacture.schema';
import { ManufactureService } from '../manufacture/manufacture.service';
import { OrderApiPostDto } from '../order/order.dto';
import { OrderEntity } from '../order/order.entity';
import { OrderService } from '../order/order.service';
import { OrderStateEnum } from '../order/order.state.enum';
import { PreManufactureService } from '../preManufacture/preManufacture.service';
import { ProductService } from '../product/product.service';
import { ShopService } from '../shop/shop.service';
import { flatten } from 'lodash';

@UseGuards(ApiGuard)
@ApiUseTags('api')
@Controller('api')
export class ApiController {
  constructor(
    private _shopService: ShopService,
    private _orderService: OrderService,
    private _productService: ProductService,
    private _manufactureService: ManufactureService,
    private _preManufactureService: PreManufactureService,
    private _customerService: CustomerService,
    private _cityService: CityService,
    private _deliveryServiceService: DeliveryServiceService,
    private _event: EventGateway,
    private _categoryService: CategoryService,
    private _filteredPageService: FilteredPageService
  ) {}

  @Post('order')
  async postOrder(@Body() model: OrderApiPostDto, @Res() res) {
    const city = await this._cityService.getOne({ where: { name: model.city } });
    if (!city) return res.status(HttpStatus.BAD_REQUEST).send('Given city not exist');
    const deliveryService = await this._deliveryServiceService.getOne({ where: { name: model.deliveryServiceName } });
    if (!deliveryService) return res.status(HttpStatus.BAD_REQUEST).send('Given deliveryService not exist');

    const product = await this._productService.getOne({ where: { name: model.productName } });
    if (!product) return res.status(HttpStatus.BAD_REQUEST).send('Product with given "productName" not exist');
    if (model.config && !product.manufacture) return res.status(HttpStatus.BAD_REQUEST).send('Given product havent manufacture');

    if (model.config) {
      console.log('CFG', model.config);
      const isConfigValid = product.manufacture.schema.every(item => {
        let cfg = model.config.find(cfg => cfg.key === item.key);
        if (!cfg) {
          cfg = { key: item.key, name: item.name, value: null };
          model.config.push(cfg);
        } else cfg.name = item.name;

        if ((item.isRequired && !cfg.value) || (cfg.value && item.type !== ManufactureSchemaTypes.TEXT && !item.optionList.some(o => o.value === cfg.value)))
          return false;
        return true;
      });
      if (!isConfigValid) return res.status(HttpStatus.BAD_REQUEST).send('Config not valid');
    }

    let customer: CustomerPostDto = await this._customerService.getOne({ where: { phone: model.customerPhone } });
    if (!customer)
      customer = {
        nameFirst: model.customerName,
        phone: model.customerPhone,
        nameLast: '<УТОЧНИТЬ !!!>',
        address: '<УТОЧНИТЬ !!!>',
        city
      };

    const newOrder: DeepPartial<OrderEntity> = {
      shop: product.shop,
      customer,
      state: model.config ? OrderStateEnum.NEW : OrderStateEnum.RECALL,
      delivery: model.config
        ? {
            state: DeliveryStateEnum.NEW,
            deliveryService,
            city,
            price: model.deliveryPrice
          }
        : undefined
    };

    if (model.price) newOrder.price = model.price;
    if (model.manufacturingCost) newOrder.manufacturingCost = model.manufacturingCost;

    if (model.config)
      newOrder.productList = [
        {
          count: model.count,
          config: model.config,
          product
        }
      ];

    const order = await this._orderService.post(newOrder as any);
    this._event.server.emit(makeEvent('Order', 'Post'), order.id);
    return res.status(HttpStatus.CREATED).send();
  }

  @Get('shop/byHost')
  async getShopByDomain(@Query('host') host: string) {
    return this._shopService.getOne({ where: { host }, relations: ['seoMeta', 'cityList'] });
  }

  @Get('city/byNameTranslit')
  async getCityByNameTranslit(@Query('nameTranslit') nameTranslit: string) {
    return this._cityService.getOne({ where: { nameTranslit } });
  }

  @Get('category/listBase')
  async getCategoryListBase(@Query('shopId') shopId: string) {
    // TODO: когда сделаем relations shop <-> category включить shopId
    return this._categoryService.getListBaseByShop(parseInt(shopId));
  }
  @Get('category/listByBaseId')
  async getCategoryListByBaseId(@Query('categoryId') categoryId: string, @Query('shopId') shopId: string) {
    // TODO: когда сделаем relations shop <-> category включить shopId
    return this._categoryService.getListChildByBase(parseInt(categoryId), parseInt(shopId));
  }
  @Get('category/byNameTranslit')
  async getCategoryByNameTranslit(@Query('nameTranslit') nameTranslit: string) {
    return this._categoryService.getOneByNameTranslit(nameTranslit);
  }
  @Get('property/listCategoryIds')
  async getPropertyListByBaseCategoryNameTranslit(@Query('categoryIds') categoryIds: string[], @Query('shopId') shopId: string) {
    if (!categoryIds) return [];
    const productList = await this._productService.getManufactureIdsByCategoryIds(categoryIds.map(id => parseInt(id)), parseInt(shopId));
    return this._manufactureService.getProps(productList.filter(p => p.manufacture).map(p => p.manufacture.id));
  }

  @Get('filteredPage/byUrl')
  async getFilteredPageByUrl(@Query('url') url: string) {
    return this._filteredPageService.getOne({ where: { url } });
  }
  @Get('filteredPage/listByCategoryId')
  async getFilteredListByCategoryId(@Query('categoryId') categoryId: string) {
    return this._filteredPageService.getByCategory(parseInt(categoryId));
  }

  @Get('product/byId')
  async getProductById(@Query('id') id: string) {
    if (id[0] !== 'm') return this._productService.getOneById(parseInt(id), { relations: ['seoMeta', 'seoTemplate', 'imageList'] });
    else return this._preManufactureService.getOneById(parseInt(id.slice(1)), { relations: ['seoMeta', 'seoTemplate', 'imageList', 'manufacture'] });
  }
  @Get('product/listByIds')
  async getProductListByIds(@Query('ids') ids: string[]) {
    return Promise.all(ids.map(id => this.getProductById(id)));
  }
  @Get('product/listByFilter')
  async getProductListByFilter(
    @Query('categoryIdList') categoryIdList: string[],
    @Query('propertyKeyValueList') propertyKeyValueList: PropKeyValue[],
    @Query('shopId') shopId: string
  ) {
    // TODO: propKeyValues filter
    const categoryIdsNum = categoryIdList ? categoryIdList.map(id => parseInt(id)) : [];
    propertyKeyValueList = (propertyKeyValueList || []).map(p => JSON.parse(p as any)) as any;
    const shopIdNum = parseInt(shopId);
    const res = await Promise.all([
      this._productService.getByFilter(categoryIdsNum, propertyKeyValueList, shopIdNum),
      this._preManufactureService.getByFilter(categoryIdsNum, propertyKeyValueList, shopIdNum)
    ]);
    return flatten(res as any);
  }
}

export interface PropKeyValue {
  key: string;
  valueList: string[];
}
