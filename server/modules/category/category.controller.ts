import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { CategoryPostDto } from './category.dto';
import { CategoryService } from './category.service';

@ApiUseTags('category')
@Controller('category')
export class CategoryController {
  constructor(private _service: CategoryService) { }

  @Get(':id')
  @Permissions('CategoryGet')
  getOneById(@Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('CategoryGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('CategoryPost')
  post(@Body() model: CategoryPostDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('CategoryPut')
  put(@Body() model: CategoryPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('CategoryDelete')
  delete(@Param('id') id: number) {
    return this._service.delete(id);
  }
}
