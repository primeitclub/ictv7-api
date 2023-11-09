import { Body, Controller, Post } from '@nestjs/common';
import { usersDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  @Post('register')
  async register(@Body() user: usersDto) {
    return user;
  }
}
