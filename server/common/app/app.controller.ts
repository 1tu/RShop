import * as path from 'path';
import { Controller, Get, Res, Post, Req } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller()
export class AppController {

  @Get()
  index( @Req() req: Request, @Res() res: Response) {
    req.user
      ? res.sendFile('index.html', { root: path.join(__dirname, '/../../../') })
      : res.redirect('/login');
  }

  @Get('login')
  login( @Res() res: Response) {
    res.sendFile('login.html', { root: path.join(__dirname, '/../../../') });
  }
}
