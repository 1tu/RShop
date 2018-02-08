import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { OrderPostDto } from './order.dto';
import { Permissions } from '../../guards/permission.guard';
import { EventGateway } from '../../common/gateway/event.gateway';
import { makeEvent } from '../../../shared/Gateway.shared';

@ApiUseTags('order')
@Controller('order')
export class OrderController {
  constructor(private _service: OrderService, private _socket: EventGateway) { }

  @Get(':id')
  @Permissions('OrderGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('OrderGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('OrderPost')
  async post( @Body() model: OrderPostDto, @Req() req) {
    (model as OrderEntity).manager = req.user;
    const order = await this._service.post(model);
    this._socket.server.emit(makeEvent('Order', 'Post'), order.id);
    return order;
  }

  @Put()
  @Permissions('OrderPut')
  async put( @Body() model: OrderPostDto) {
    const order = await this._service.put(model);
    this._socket.server.emit(makeEvent('Order', 'Put'), order.id);
    return order;
  }

  @Delete(':id')
  @Permissions('OrderDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
