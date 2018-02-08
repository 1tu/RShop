import { Controller, Req, Get, Param, Post, Body, Put, Delete, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiUseTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserDto, UserCreateDto } from './user.dto';
import { UserEntity } from './user.entity';
import { Permissions } from '../../guards/permission.guard';
import { AuthGuard } from '../../guards/auth.guard';

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

  @Get('own')
  @UseGuards(AuthGuard)
  getOwn( @Req() req) {
    return this._service.getOneById(req.user.id);
  }

  @Get(':id')
  @Permissions('UserGet')
  getOneById( @Param('id') id: number) {
    return this._service.getOneById(id);
  }

  @Get()
  @Permissions('UserGet')
  get() {
    return this._service.get();
  }

  @Post()
  @Permissions('UserGet')
  post( @Body() model: UserCreateDto) {
    (model as UserEntity).role = { id: 1 } as any;
    return this._service.post(model);
  }

  @Put()
  @Permissions('UserGet')
  put( @Body() model: UserDto) {
    (model as UserEntity).role = { id: 1 } as any;
    return this._service.put(model);
  }

  @Delete(':id')
  @Permissions('UserGet')
  delete( @Param('id') id: number) {
    return this._service.delete(id);
  }
}
