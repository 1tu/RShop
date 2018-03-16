import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { ShopDto } from './shop.dto';
import { ShopService } from './shop.service';

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
