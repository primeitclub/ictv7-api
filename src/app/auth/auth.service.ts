import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { forgotPasswordDTO, loginUserDTO, registerUserDTO } from './auth.dto';
import { UserService } from '../user/user.service';
import {
  comparePassword,
  generateHashedPassword
} from '../../utils/bcrypt.util';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

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

    if (user)
      return {
        statusCode: 200,
        message: 'You have been registered successfully.'
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
      const accessToken = this.jwtService.sign({
        sub: checkUserExists.id,
        name: checkUserExists.username,
        email: checkUserExists.email
      });
      return {
        statusCode: 200,
        message: 'You have been logged in successfully.',
        accessToken
      };
    } else {
      throw new HttpException(
        'Credentials do not match our records.',
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  async forgotPassword(@Body() request: forgotPasswordDTO) {
    const { email } = request;

    const checkUserExists = await this.userService.findByEmail(email);

    if (!checkUserExists)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    const content = 'You dumb ass. You forgot your password?';

    await this.mailService.sendEmail(email, 'Forgot password email.', content);

    return {
      statusCode: 200,
      message:
        'A password reset email has been sent to your email address. Please check your inbox.'
    };
  }
}
