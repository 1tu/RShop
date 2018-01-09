import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiUseTags } from '@nestjs/swagger';
import { CustomerPostDto } from './customer.dto';

@ApiUseTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private _service: CustomerService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: CustomerPostDto) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: CustomerPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
