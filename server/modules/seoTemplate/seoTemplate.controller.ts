import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { SeoTemplatePostDto } from './seoTemplate.dto';
import { SeoTemplateService } from './seoTemplate.service';

@ApiUseTags('seoTemplate')
@Controller('seoTemplate')
export class SeoTemplateController {
  constructor(private _service: SeoTemplateService) { }

  @Get(':id')
  @Permissions('SeoTemplateGet')
  getOneById(@Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('SeoTemplateGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('SeoTemplatePost')
  post(@Body() model: SeoTemplatePostDto) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('SeoTemplatePut')
  put(@Body() model: SeoTemplatePostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('SeoTemplateDelete')
  delete(@Param('id') id: number) {
    return this._service.delete(id);
  }
}
