import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { DeliveryServiceService } from './deliveryService.service';
import { DeliveryServiceEntity } from './deliveryService.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('deliveryService')
@Controller('deliveryService')
export class DeliveryServiceController {
  constructor(private _service: DeliveryServiceService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: DeliveryServiceEntity) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: Partial<DeliveryServiceEntity>) {
    return this._service.put(model);
  }

  @Delete()
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
