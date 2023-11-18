import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all-users')
  async handleGetAllUsers() {
    const users = await this.userService.getAllUsers();
    return {
      statusCode: 200,
      message: 'List of all users',
      users
    };
  }
}
