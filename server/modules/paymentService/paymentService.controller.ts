import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PaymentServiceService } from './paymentService.service';
import { PaymentServiceEntity } from './paymentService.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('paymentService')
@Controller('paymentService')
export class PaymentServiceController {
  constructor(private _service: PaymentServiceService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: PaymentServiceEntity) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: Partial<PaymentServiceEntity>) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
