import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { DeliveryPostDto } from './delivery.dto';
import { DeliveryService } from './delivery.service';

@ApiUseTags('delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private _service: DeliveryService) { }

  @Get(':id')
  @Permissions('DeliveryGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('DeliveryGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('DeliveryPost')
  post( @Body() model: DeliveryPostDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('DeliveryPut')
  put( @Body() model: DeliveryPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('DeliveryDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
