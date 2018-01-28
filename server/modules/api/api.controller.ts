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

@UseGuards(ApiGuard)
@ApiUseTags('api')
@Controller('api')
export class ApiController {
  constructor(
    private _orderService: OrderService, private _productService: ProductService,
    private _customerService: CustomerService, private _cityService: CityService,
    private _event: EventGateway
  ) { }

  @Post('order')
  async post( @Body() model: OrderApiPostDto, @Res() res) {
    const city = await this._cityService.getOne({ where: { name: model.city } });
    if (!city)
      return res.status(HttpStatus.BAD_REQUEST).send('Given city not exist');

    const product = await this._productService.getOne({ where: { name: model.productName } });
    if (!product)
      return res.status(HttpStatus.BAD_REQUEST).send('Product with given "productName" not exist');
    if (model.config && !product.manufacture)
      return res.status(HttpStatus.BAD_REQUEST).send('Given product havent manufacture');
    if (model.config.length !== product.manufacture.schema.length)
      return res.status(HttpStatus.BAD_REQUEST).send('Config not valid');

    const isConfigValid = model.config.every(cfg => {
      const item = product.manufacture.schema
        .find(s => s.key === cfg.key && s.optionList.some(o => o.value === cfg.value));
      if (!item) return false;
      cfg.name = item.name;
      return true;
    });
    if (!isConfigValid)
      return res.status(HttpStatus.BAD_REQUEST).send('Some config key/value pair wrong');

    let customer: CustomerPostDto = await this._customerService.getOne({ where: { phone: model.customerPhone } });
    if (!customer) customer = {
      nameFirst: model.customerName, phone: model.customerPhone,
      nameLast: '<УТОЧНИТЬ !!!>', address: '<УТОЧНИТЬ !!!>', city,
    };

    const newOrder: any = {
      productList: [{
        count: model.count,
        config: model.config,
        product
      }],
      shop: product.shop,
      customer,
      state: 0
    };
    const order = await this._orderService.post(newOrder);
    this._event.server.emit(makeEvent('Order', 'Post'), order.id);
    return res.status(HttpStatus.CREATED).send();
  }

}
