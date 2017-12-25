import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { OrderProductService } from './orderProduct.service';
import { OrderProductEntity } from './orderProduct.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('orderProduct')
@Controller('orderProduct')
export class OrderProductController {
  constructor(private _service: OrderProductService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: OrderProductEntity) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: OrderProductEntity) {
    return this._service.put(model);
  }

  @Delete()
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
