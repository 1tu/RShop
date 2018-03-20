import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { UploadedFile } from 'express-fileupload';
import { join } from 'path';
import * as uuidv4 from 'uuid/v4';

import { Permissions } from '../../guards/permission.guard';
import { ImagePostDto } from './image.dto';
import { ImageService } from './image.service';

@ApiUseTags('image')
@Controller('image')
export class ImageController {
  constructor(private _service: ImageService) {}

  @Get(':id')
  @Permissions('ImageGet')
  getOneById(@Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('ImageGet')
  get() {
    return this._service.get();
  }

  @Post('upload')
  @Permissions('ImagePost')
  async post(@Req() req: Express.Request, @Res() rs, @Body() model: ImagePostDto) {
    if (!req.files) return rs.status(HttpStatus.BAD_REQUEST).send('No files were uploaded.');
    (model as any).user = req.user;

    const image: UploadedFile = req.files.image as any;
    const split = image.name.split('.');
    const ext = (model.filepath = '/upload/' + uuidv4() + '.' + split[split.length - 1]);
    await image.mv(join(__dirname, '../../../public', model.filepath), null);
    const instance = await this._service.post(model);
    return rs.status(HttpStatus.CREATED).send(instance);
  }

  @Put()
  @Permissions('ImagePut')
  put(@Body() model: ImagePostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('ImageDelete')
  delete(@Param('id') id: number) {
    return this._service.delete(id);
  }
}
