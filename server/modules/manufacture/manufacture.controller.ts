import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { ManufactureDto } from './manufacture.dto';
import { ManufactureService } from './manufacture.service';

@ApiUseTags('manufacture')
@Controller('manufacture')
export class ManufactureController {
  constructor(private _service: ManufactureService) {}

  @Get('props')
  @Permissions('ManufactureGet')
  getProps() {
    return this._service.getProps();
  }

  @Get(':id')
  @Permissions('ManufactureGet')
  getOneById(@Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('ManufactureGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('ManufacturePost')
  post(@Body() model: ManufactureDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('ManufacturePut')
  put(@Body() model: ManufactureDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('ManufactureDelete')
  delete(@Param('id') id: number) {
    return this._service.delete(id);
  }
}
