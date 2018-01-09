import { Controller, Req, Get, Param, Post, Body, Put, Delete, Session } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ContactPostDto } from './contact.dto';
import { ContactEntity } from './contact.entity';

@ApiUseTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private _service: ContactService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: ContactPostDto, @Req() req) {
    (model as ContactEntity).manager = req.user;
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: ContactPostDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
