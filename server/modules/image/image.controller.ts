import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageEntity } from './image.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('image')
@Controller('image')
export class ImageController {
  constructor(private _service: ImageService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: ImageEntity) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: Partial<ImageEntity>) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }


}
