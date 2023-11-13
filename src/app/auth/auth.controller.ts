import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './google-oauth.guard';

@Controller('auth')
export class AuthController {
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
}
