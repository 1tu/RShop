import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ProductDto } from './product.dto';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('product')
@Controller('product')
export class ProductController {
  constructor(private _service: ProductService) { }

  @Get(':id')
  @Permissions('ProductGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('ProductGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('ProductPost')
  post( @Body() model: ProductDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('ProductPut')
  put( @Body() model: ProductDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('ProductDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
