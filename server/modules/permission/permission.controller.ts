import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiUseTags } from '@nestjs/swagger';
import { PermissionDto } from './permission.dto';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private _service: PermissionService) { }

  @Get(':id')
  @Permissions('PermissionGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('PermissionGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('PermissionPost')
  post( @Body() model: PermissionDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('PermissionPut')
  put( @Body() model: PermissionDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('PermissionDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
