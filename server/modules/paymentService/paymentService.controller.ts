import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { PaymentServiceDto } from './paymentService.dto';
import { PaymentServiceService } from './paymentService.service';

@ApiUseTags('paymentService')
@Controller('paymentService')
export class PaymentServiceController {
  constructor(private _service: PaymentServiceService) { }

  @Get(':id')
  @Permissions('PaymentServiceGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('PaymentServiceGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('PaymentServicePost')
  post( @Body() model: PaymentServiceDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('PaymentServicePut')
  put( @Body() model: PaymentServiceDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('PaymentServiceDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
