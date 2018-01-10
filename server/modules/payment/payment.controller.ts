import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiUseTags } from '@nestjs/swagger';
import { PaymentDto } from './payment.dto';

@ApiUseTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private _service: PaymentService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: PaymentDto) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: PaymentDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
