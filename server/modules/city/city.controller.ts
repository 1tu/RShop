import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './city.entity';
import { ApiUseTags } from '@nestjs/swagger';

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
  post( @Body() model: CityEntity) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: Partial<CityEntity>) {
    return this._service.put(model);
  }

  @Delete()
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
