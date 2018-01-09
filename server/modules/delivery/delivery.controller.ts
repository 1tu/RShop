import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { ApiUseTags } from '@nestjs/swagger';
import { DeliveryPostDto } from './delivery.dto';

@ApiUseTags('delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private _service: DeliveryService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: DeliveryPostDto) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: DeliveryPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
