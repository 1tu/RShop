import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { RemindService } from './remind.service';
import { RemindEntity } from './remind.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { RemindDto } from './remind.dto';
import { Permissions } from '../../guards/permission.guard';

@ApiUseTags('remind')
@Controller('remind')
export class RemindController {
  constructor(private _service: RemindService) { }

  @Get(':id')
  @Permissions('remindGet')
  getOneById( @Param('id') id: number, @Req() req) {
    return this._service.getOneById(id, { where: { manager: req.user.id } });
  }

  @Get()
  @Permissions('remindGet')
  get( @Req() req) {
    return this._service.get({ where: { manager: req.user.id } });
  }

  @Post()
  @Permissions('remindPost')
  post( @Body() model: RemindDto, @Req() req) {
    (model as RemindEntity).manager = req.user;
    return this._service.post(model);
  }

  @Put()
  @Permissions('remindPut')
  put( @Body() model: RemindDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('remindDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
