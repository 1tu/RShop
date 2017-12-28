import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopEntity } from './shop.entity';
import { ApiUseTags } from '@nestjs/swagger';

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
  post( @Body() model: ShopEntity) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: Partial<ShopEntity>) {
    return this._service.put(model);
  }

  @Delete()
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
