import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ManufactureService } from './manufacture.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ManufactureDto } from './manufacture.dto';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('manufacture')
@Controller('manufacture')
export class ManufactureController {
  constructor(private _service: ManufactureService) { }

  @Get(':id')
  @Permissions('ManufactureGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('ManufactureGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('ManufacturePost')
  post( @Body() model: ManufactureDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('ManufacturePut')
  put( @Body() model: ManufactureDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('ManufactureDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
