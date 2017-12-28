import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { RemindService } from './remind.service';
import { RemindEntity } from './remind.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('remind')
@Controller('remind')
export class RemindController {
  constructor(private _service: RemindService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: RemindEntity) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: Partial<RemindEntity>) {
    return this._service.put(model);
  }

  @Delete()
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
