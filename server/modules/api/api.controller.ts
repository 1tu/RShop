import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '../../guards/permission.guard';
import { OrderService } from '../order/order.service';
import { OrderApiPostDto } from '../order/order.dto';
import { ApiGuard } from '../../guards/api.guard';

@UseGuards(ApiGuard)
@ApiUseTags('api')
@Controller('api')
export class ApiController {
  constructor(private _orderService: OrderService) { }

  @Post('order')
  post( @Body() model: OrderApiPostDto) {
    console.log('API ORDER:', model);
    // return this._orderService.post(model);
  }

}
