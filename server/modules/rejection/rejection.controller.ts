import { Controller, Req, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { RejectionService } from './rejection.service';
import { RejectionEntity } from './rejection.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('rejection')
@Controller('rejection')
export class RejectionController {
  constructor(private _service: RejectionService) { }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: RejectionEntity) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: Partial<RejectionEntity>) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
