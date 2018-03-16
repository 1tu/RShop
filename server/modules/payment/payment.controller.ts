import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { PaymentDto } from './payment.dto';
import { PaymentService } from './payment.service';

@ApiUseTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private _service: PaymentService) { }

  @Get(':id')
  @Permissions('PaymentGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('PaymentGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('PaymentPost')
  post( @Body() model: PaymentDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('PaymentPut')
  put( @Body() model: PaymentDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('PaymentDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
