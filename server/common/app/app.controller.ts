import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';

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
