import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { ApiUseTags } from '@nestjs/swagger';
import { DeliveryPostDto } from './delivery.dto';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private _service: DeliveryService) { }

  @Get(':id')
  @Permissions('deliveryGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('deliveryGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('deliveryPost')
  post( @Body() model: DeliveryPostDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('deliveryPut')
  put( @Body() model: DeliveryPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('deliveryDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
