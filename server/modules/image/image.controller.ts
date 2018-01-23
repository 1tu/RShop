import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageEntity } from './image.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('image')
@Controller('image')
export class ImageController {
  constructor(private _service: ImageService) { }

  @Get(':id')
  @Permissions('imageGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('imageGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('imagePost')
  post( @Body() model: ImageEntity) {
    return this._service.post(model);
  }

  @Put()
  @Permissions('imagePut')
  put( @Body() model: Partial<ImageEntity>) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('imageDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
