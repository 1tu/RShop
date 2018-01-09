import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { DeliveryServiceService } from './deliveryService.service';
import { ApiUseTags } from '@nestjs/swagger';
import { DeliveryServicePostDto } from './deliveryService.dto';

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
  post( @Body() model: DeliveryServicePostDto) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: DeliveryServicePostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
