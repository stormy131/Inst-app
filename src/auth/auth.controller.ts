import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/database/models/users';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Get('login')
  getLoginPage(){
    return 'login page';
  }

  @Post('login')
  async postLogin(@Body() loginData: LoginDto): Promise<string | {token: string, refToken: string}> {
    return await this.authService.postLogin(loginData);
  }

  @Post('registration')
  async postReg(@Body() newUser: RegistrationDto): Promise<string>{
    return this.authService.postReg(newUser);
  }

  @Post('refresh')
  async refreshToken(@Body() body: {oldToken: string, refreshToken: string}){
    return await this.authService.refreshToken(body.oldToken, body.refreshToken);
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req){

  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req){
    return await this.authService.googleLogin(req);
  }
}
