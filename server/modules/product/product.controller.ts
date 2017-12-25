import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('product')
@Controller('product')
export class ProductController {
  constructor(private _service: ProductService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: ProductEntity) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: ProductEntity) {
    return this._service.put(model);
  }

  @Delete()
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
