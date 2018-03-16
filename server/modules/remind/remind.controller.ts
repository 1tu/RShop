import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Permissions } from '../../guards/permission.guard';
import { RemindDto } from './remind.dto';
import { RemindEntity } from './remind.entity';
import { RemindService } from './remind.service';

@ApiUseTags('remind')
@Controller('remind')
export class RemindController {
  constructor(private _service: RemindService) { }

  @Get(':id')
  @Permissions('RemindGet')
  getOneById( @Param('id') id: number, @Req() req) {
    return this._service.getOneById(id, { where: { manager: req.user.id } });
  }

  @Get()
  @Permissions('RemindGet')
  get( @Req() req) {
    return this._service.get({ where: { manager: req.user.id } });
  }

  @Post()
  @Permissions('RemindPost')
  post( @Body() model: RemindDto, @Req() req) {
    (model as RemindEntity).manager = req.user;
    return this._service.post(model);
  }

  @Put()
  @Permissions('RemindPut')
  put( @Body() model: RemindDto) {
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('RemindDelete')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
