import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiUseTags } from '@nestjs/swagger';
import { CustomerPostDto } from './customer.dto';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private _service: CustomerService) { }

  @Get(':id')
  @Permissions('CustomerGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('CustomerGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('CustomerPost')
  post( @Body() model: CustomerPostDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('CustomerPut')
  put( @Body() model: CustomerPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('CustomerDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
