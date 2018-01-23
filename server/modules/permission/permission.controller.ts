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
  @Permissions('permissionGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('permissionGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('permissionPost')
  post( @Body() model: PermissionDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('permissionPut')
  put( @Body() model: PermissionDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('permissionDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
