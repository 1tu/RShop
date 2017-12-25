import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactEntity } from './contact.entity';
import { ApiUseTags } from '@nestjs/swagger';

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
  post( @Body() model: ContactEntity) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: ContactEntity) {
    return this._service.put(model);
  }

  @Delete()
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
