import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { PreManufactureDto } from './preManufacture.dto';
import { PreManufactureService } from './preManufacture.service';

@ApiUseTags('preManufacture')
@Controller('preManufacture')
export class PreManufactureController {
  constructor(private _service: PreManufactureService) { }

  @Get(':id')
  @Permissions('PreManufactureGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('PreManufactureGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('PreManufacturePost')
  post( @Body() model: PreManufactureDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('PreManufacturePut')
  put( @Body() model: PreManufactureDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('PreManufactureDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
