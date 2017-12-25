import { Controller, Post, HttpStatus, HttpCode, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  public async getToken( @Param('email') email: string) {
    return await this.authService.createToken(email);
  }

  @Get('authorized')
  public async authorized() {
    console.log('Authorized route...');
  }
}
