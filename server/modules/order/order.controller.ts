import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { OrderPostDto } from './order.dto';

@ApiUseTags('order')
@Controller('order')
export class OrderController {
  constructor(private _service: OrderService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: OrderPostDto, @Req() req) {
    (model as OrderEntity).manager = req.user;
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: OrderPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
