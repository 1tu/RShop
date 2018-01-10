import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiUseTags } from '@nestjs/swagger';
import { PermissionDto } from './permission.dto';

@ApiUseTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private _service: PermissionService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: PermissionDto) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: PermissionDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
