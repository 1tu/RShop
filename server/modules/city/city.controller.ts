import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { ApiUseTags } from '@nestjs/swagger';
import { CityPostDto } from './city.dto';

@ApiUseTags('city')
@Controller('city')
export class CityController {
  constructor(private _service: CityService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: CityPostDto) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: CityPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
