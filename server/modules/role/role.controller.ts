import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

@ApiUseTags('role')
@Controller('role')
export class RoleController {
  constructor(private _service: RoleService) { }

  @Get(':id')
  @Permissions('RoleGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('RoleGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('RolePost')
  post( @Body() model: RoleEntity) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('RolePut')
  put( @Body() model: Partial<RoleEntity>) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('RoleDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
