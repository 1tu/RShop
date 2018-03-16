import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { ImageEntity } from './image.entity';
import { ImageService } from './image.service';

@ApiUseTags('image')
@Controller('image')
export class ImageController {
  constructor(private _service: ImageService) { }

  @Get(':id')
  @Permissions('ImageGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('ImageGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('ImagePost')
  post( @Body() model: ImageEntity) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('ImagePut')
  put( @Body() model: Partial<ImageEntity>) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('ImageDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
