import { Controller, Req, Get, Param, Post, Body, Put, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private _service: UserService) { }

  @Post('login')
  login( @Res() res: Response) {
    res.redirect('/');
  }

  @Post('logout')
  logout( @Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect('/login');
  }

  @Get(':id')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  get() {
    return this._service.get();
  }

  @Post()
  post( @Body() model: UserEntity) {
    return this._service.post(model);
  }

  @Put()
  put( @Body() model: Partial<UserEntity>) {
    return this._service.put(model);
  }

  @Delete(':id')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
