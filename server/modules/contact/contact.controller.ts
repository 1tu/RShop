import { Controller, Req, Get, Param, Post, Body, Put, Delete, Session } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ContactPostDto } from './contact.dto';
import { ContactEntity } from './contact.entity';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private _service: ContactService) { }

  @Get(':id')
  @Permissions('contactGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('contactGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('contactPost')
  post( @Body() model: ContactPostDto, @Req() req) {
    (model as ContactEntity).manager = req.user;
    return this._service.post(model);
  }

  @Put()
  @Permissions('contactPut')
  put( @Body() model: ContactPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('contactDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
