import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { forgotPasswordDTO, loginUserDTO, registerUserDTO } from './auth.dto';
import { UserService } from '../user/user.service';
import {
  compareHashedInformation,
  hashInformation
} from '../../utils/bcrypt.util';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { generateOTP } from 'src/utils/generateOTP.util';
import { UserType } from '../user/user.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { OTP } from '../user/model/Otp.entity';
import { Repository } from 'typeorm';
import calculateExpirationDate from 'src/utils/date.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,

    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>
  ) {}

  async register(@Body() request: registerUserDTO) {
    const { username, email, phone, password, address, college_name, TnCFlag } =
      request;

    const userAlreadyExist = await this.userService.findByEmail(email);

    if (userAlreadyExist)
      throw new HttpException(
        'Email has already been taken.',
        HttpStatus.FOUND
      );

    const hashedPassword = await hashInformation(password);

    const user = await this.userService.createUser({
      username,
      email,
      phone,
      password: hashedPassword,
      user_type: UserType.user,
      college_name,
      address,
      TnCFlag,
      verified: false
    });

    if (user) {
      await this.sendOTPVerificationMail(user.email);
    }
  }

  async login(@Body() request: loginUserDTO) {
    const { email, password } = request;

    const checkUserExists = await this.userService.findByEmail(email);

    if (!checkUserExists)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    const checkPassword = await compareHashedInformation(
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

  async loginWithGoogle(@Body() request: any) {
    const { username, email, accessToken, refreshToken } = request;

    const checkUserExists = await this.userService.findByEmail(email);

    if (checkUserExists)
      throw new HttpException(
        'Email has already been taken.',
        HttpStatus.FOUND
      );

    if (!checkUserExists) {
      const user = await this.userService.createUser({
        username,
        email,
        phone: '',
        password: '',
        user_type: UserType.user,
        college_name: '',
        address: '',
        TnCFlag: true,
        verified: true
      });

      if (user) {
        return {
          statusCode: 200,
          message: 'You have been registered successfully.',
          accessToken,
          refreshToken
        };
      }
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

  async sendOTPVerificationMail(email: string) {
    const userExists = await this.userService.findByEmail(email);

    if (!userExists)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    const otp = generateOTP();

    const content = `OTP: ${otp}`;

    await this.otpRepository.save({
      otpNumber: otp,
      expiresAt: await calculateExpirationDate(),
      createdAt: new Date().toISOString(),
      user: userExists
    });

    await this.mailService.sendEmail(email, 'Verify your email', content);

    return {
      statusCode: 200,
      message:
        'Verification mail has been sent to your email address. Please check your inbox.'
    };
  }
}
