import { Controller, Post, Body, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '../../guards/permission.guard';
import { OrderService } from '../order/order.service';
import { OrderApiPostDto } from '../order/order.dto';
import { ApiGuard } from '../../guards/api.guard';
import { ProductService } from '../product/product.service';
import { ShopService } from '../shop/shop.service';
import { CustomerService } from '../customer/customer.service';
import { CityService } from '../city/city.service';
import { CustomerPostDto } from '../customer/customer.dto';
import { EventGateway } from '../../common/gateway/event.gateway';
import { makeEvent } from '../../../shared/Gateway.shared';
import { ManufactureSchemaTypes } from '../manufacture/manufacture.schema';
import { DeliveryServiceService } from '../deliveryService/deliveryService.service';
import { OrderEntity } from '../order/order.entity';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { DeliveryStateEnum } from '../delivery/delivery.state.enum';

@UseGuards(ApiGuard)
@ApiUseTags('api')
@Controller('api')
export class ApiController {
  constructor(
    private _orderService: OrderService, private _productService: ProductService,
    private _customerService: CustomerService, private _cityService: CityService,
    private _deliveryServiceService: DeliveryServiceService, private _event: EventGateway
  ) { }

  @Post('order')
  async post(@Body() model: OrderApiPostDto, @Res() res) {
    const city = await this._cityService.getOne({ where: { name: model.city } });
    if (!city)
      return res.status(HttpStatus.BAD_REQUEST).send('Given city not exist');
    const deliveryService = await this._deliveryServiceService.getOne({ where: { name: model.deliveryServiceName } });
    if (!deliveryService)
      return res.status(HttpStatus.BAD_REQUEST).send('Given deliveryService not exist');

    const product = await this._productService.getOne({ where: { name: model.productName } });
    if (!product)
      return res.status(HttpStatus.BAD_REQUEST).send('Product with given "productName" not exist');
    if (model.config && !product.manufacture)
      return res.status(HttpStatus.BAD_REQUEST).send('Given product havent manufacture');

    if (model.config) {
      console.log('CFG', model.config);
      const isConfigValid = product.manufacture.schema.every(item => {
        let cfg = model.config.find(cfg => cfg.key === item.key);
        if (!cfg) {
          cfg = { key: item.key, name: item.name, value: null };
          model.config.push(cfg);
        }
        else cfg.name = item.name;

        if (item.isRequired && !cfg.value ||
          (cfg.value && item.type !== ManufactureSchemaTypes.TEXT && !item.optionList.some(o => o.value === cfg.value))) return false;
        return true;
      });
      if (!isConfigValid)
        return res.status(HttpStatus.BAD_REQUEST).send('Config not valid');
    }

    let customer: CustomerPostDto = await this._customerService.getOne({ where: { phone: model.customerPhone } });
    if (!customer) customer = {
      nameFirst: model.customerName, phone: model.customerPhone,
      nameLast: '<УТОЧНИТЬ !!!>', address: '<УТОЧНИТЬ !!!>', city,
    };

    const newOrder: DeepPartial<OrderEntity> = {
      shop: product.shop,
      customer,
      state: 0,
      delivery: {
        state: DeliveryStateEnum.NEW,
        deliveryService, city,
        price: parseFloat(model.deliveryPrice),
      }
    };

    if (model.price) newOrder.price = parseFloat(model.price);
    if (model.manufacturingCost) newOrder.manufacturingCost = parseFloat(model.manufacturingCost);

    if (model.config) newOrder.productList = [{
      count: model.count,
      config: model.config,
      product
    }];

    const order = await this._orderService.post(newOrder as any);
    this._event.server.emit(makeEvent('Order', 'Post'), order.id);
    return res.status(HttpStatus.CREATED).send();
  }
}
