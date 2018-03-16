import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { ContactPostDto } from './contact.dto';
import { ContactEntity } from './contact.entity';
import { ContactService } from './contact.service';

@ApiUseTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private _service: ContactService) { }

  @Get(':id')
  @Permissions('ContactGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('ContactGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('ContactPost')
  post( @Body() model: ContactPostDto, @Req() req) {
    (model as ContactEntity).manager = req.user;
    return this._service.post(model);
  }

  @Put()
  @Permissions('ContactPut')
  put( @Body() model: ContactPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('ContactDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
