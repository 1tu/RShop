import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiUseTags } from '@nestjs/swagger';
import { PaymentDto } from './payment.dto';
import { Permissions } from '../../guards/permission.guard';

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
