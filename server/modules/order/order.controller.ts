import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { OrderPostDto } from './order.dto';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('order')
@Controller('order')
export class OrderController {
  constructor(private _service: OrderService) { }

  @Get(':id')
  @Permissions('orderGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('orderGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('orderPost')
  post( @Body() model: OrderPostDto, @Req() req) {
    (model as OrderEntity).manager = req.user;
    return this._service.post(model);
  }

  @Put()
  @Permissions('orderPut')
  put( @Body() model: OrderPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('orderDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
