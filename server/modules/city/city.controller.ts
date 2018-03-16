import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { CityPostDto } from './city.dto';
import { CityService } from './city.service';

@ApiUseTags('city')
@Controller('city')
export class CityController {
  constructor(private _service: CityService) { }

  @Get(':id')
  @Permissions('CityGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('CityGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('CityPost')
  post( @Body() model: CityPostDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('CityPut')
  put( @Body() model: CityPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('CityDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
