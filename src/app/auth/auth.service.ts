import { Body, Injectable } from '@nestjs/common';
import { registerUserDTO } from './auth.dto';
import { UserService } from '../user/user.service';
import { generateHashedPassword } from '../user/bcrypt.helper';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(@Body() request: registerUserDTO) {
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
}
