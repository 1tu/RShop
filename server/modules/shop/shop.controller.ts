import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ShopDto } from './shop.dto';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('shop')
@Controller('shop')
export class ShopController {
  constructor(private _service: ShopService) { }

  @Get(':id')
  @Permissions('ShopGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('ShopGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('ShopPost')
  post( @Body() model: ShopDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('ShopPut')
  put( @Body() model: ShopDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('ShopDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
