import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { RejectionService } from './rejection.service';
import { ApiUseTags } from '@nestjs/swagger';
import { RejectionDto } from './rejection.dto';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('rejection')
@Controller('rejection')
export class RejectionController {
  constructor(private _service: RejectionService) { }

  @Get(':id')
  @Permissions('rejectionGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('rejectionGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('rejectionPost')
  post( @Body() model: RejectionDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('rejectionPut')
  put( @Body() model: RejectionDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('rejectionDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
