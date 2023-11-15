import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './google-oauth.guard';
import {
  registerUserDTO,
  loginUserDTO,
  forgotPasswordDTO,
  resetPasswordDTO
} from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { generateHashedPassword } from '../user/bcrypt.helper';
import { UserService } from '../user/user.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

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
    const {
      username,
      email,
      phone,
      password,
      address,
      user_type,
      college_name,
      TnCFlag
    } = request;
    const hashedPassword = await generateHashedPassword(password);

    const user = await this.userService.createUser({
      username,
      email,
      phone,
      password: hashedPassword,
      user_type,
      college_name,
      address,
      TnCFlag
    });

    return {
      message: 'You have been registered successfully.',
      data: user
    };
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
