import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ShopDto } from './shop.dto';

@ApiUseTags('shop')
@Controller('shop')
export class ShopController {
  constructor(private _service: ShopService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: ShopDto) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: ShopDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
