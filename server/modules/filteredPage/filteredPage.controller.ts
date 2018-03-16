import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { FilteredPagePostDto } from './filteredPage.dto';
import { FilteredPageService } from './filteredPage.service';

@ApiUseTags('filteredPage')
@Controller('filteredPage')
export class FilteredPageController {
  constructor(private _service: FilteredPageService) { }

  @Get(':id')
  @Permissions('FilteredPageGet')
  getOneById(@Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('FilteredPageGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('FilteredPagePost')
  post(@Body() model: FilteredPagePostDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('FilteredPagePut')
  put(@Body() model: FilteredPagePostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('FilteredPageDelete')
  delete(@Param('id') id: number) {
    return this._service.delete(id);
  }
}
