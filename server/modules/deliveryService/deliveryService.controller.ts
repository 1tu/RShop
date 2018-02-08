import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { DeliveryServiceService } from './deliveryService.service';
import { ApiUseTags } from '@nestjs/swagger';
import { DeliveryServicePostDto } from './deliveryService.dto';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('deliveryService')
@Controller('deliveryService')
export class DeliveryServiceController {
  constructor(private _service: DeliveryServiceService) { }

  @Get(':id')
  @Permissions('DeliveryServiceGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('DeliveryServiceGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('DeliveryServicePost')
  post( @Body() model: DeliveryServicePostDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('DeliveryServicePut')
  put( @Body() model: DeliveryServicePostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('DeliveryServiceDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
