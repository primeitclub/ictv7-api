import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { loginUserDTO, registerUserDTO } from './auth.dto';
import { UserService } from '../user/user.service';
import { comparePassword, generateHashedPassword } from '../user/bcrypt.helper';

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

    const userAlreadyExist = await this.userService.findByEmail(email);

    if (userAlreadyExist)
      throw new HttpException(
        'Email has already been taken.',
        HttpStatus.FOUND
      );

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

  async login(@Body() request: loginUserDTO) {
    const { email, password } = request;

    const checkUserExists = await this.userService.findByEmail(email);

    if (!checkUserExists)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    const checkPassword = await comparePassword(
      password,
      checkUserExists.password
    );

    if (checkPassword) {
      return {
        message: 'You have been logged in successfully.'
      };
    } else {
      throw new HttpException(
        'Credentials do not match our records.',
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
