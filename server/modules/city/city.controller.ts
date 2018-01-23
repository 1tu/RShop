import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { ApiUseTags } from '@nestjs/swagger';
import { CityPostDto } from './city.dto';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('city')
@Controller('city')
export class CityController {
  constructor(private _service: CityService) { }

  @Get(':id')
  @Permissions('cityGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('cityGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('cityPost')
  post( @Body() model: CityPostDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('cityPut')
  put( @Body() model: CityPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('cityDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
