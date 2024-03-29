import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { RejectionDto } from './rejection.dto';
import { RejectionService } from './rejection.service';

@ApiUseTags('rejection')
@Controller('rejection')
export class RejectionController {
  constructor(private _service: RejectionService) { }

  @Get(':id')
  @Permissions('RejectionGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('RejectionGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('RejectionPost')
  post( @Body() model: RejectionDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('RejectionPut')
  put( @Body() model: RejectionDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('RejectionDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
