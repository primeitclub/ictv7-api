import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './google-oauth.guard';
import {
  registerUserDTO,
  loginUserDTO,
  forgotPasswordDTO,
  resetPasswordDTO
} from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login-with-google')
  @UseGuards(GoogleOAuthGuard)
  handleLoginWithGoogle() {
    return { message: 'OAuth using google.' };
  }

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  handleGoogleRedirect(@Req() req) {
    return req.user;
  }

  @Post('register')
  async handleRegister(@Body() request: registerUserDTO) {
    return await this.authService.register(request);
  }

  @Post('login')
  handleLogin(@Body() request: loginUserDTO) {
    console.log(request);
  }

  @Post('forgot-password')
  handleForgotPassword(@Body() request: forgotPasswordDTO) {
    console.log(request);
  }

  @Post('reset-password/:id/:token')
  handleResetPassword(@Body() request: resetPasswordDTO) {
    console.log(request);
  }
}