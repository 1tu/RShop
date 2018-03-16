import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { SeoMetaPostDto } from './seoMeta.dto';
import { SeoMetaService } from './seoMeta.service';

@ApiUseTags('seoMeta')
@Controller('seoMeta')
export class SeoMetaController {
  constructor(private _service: SeoMetaService) { }

  @Get(':id')
  @Permissions('SeoMetaGet')
  getOneById(@Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('SeoMetaGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('SeoMetaPost')
  post(@Body() model: SeoMetaPostDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('SeoMetaPut')
  put(@Body() model: SeoMetaPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('SeoMetaDelete')
  delete(@Param('id') id: number) {
    return this._service.delete(id);
  }
}
