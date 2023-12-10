import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  forgotPasswordDTO,
  loginUserDTO,
  refreshTokenDTO,
  registerUserDTO,
  resetPasswordDTO,
  verifyOTPDTO
} from './auth.dto';
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
import { User } from '../user/model/User.entity';
import { jwt } from 'src/config/env';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,

    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async register(@Body() request: registerUserDTO) {
    const { username, email, phone, password, address, college_name, TnCFlag } =
      request;

    const userAlreadyExist = await this.userService.findByEmail(email);

    if (userAlreadyExist)
      throw new HttpException(
        'Email has already been taken.',
        HttpStatus.CONFLICT
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

      return {
        id: user.id,
        email: user.email,
        statusCode: HttpStatus.OK,
        message:
          'Verification mail has been sent to your email address. Please check your inbox.'
      };
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
      const payload = {
        userId: checkUserExists.id,
        name: checkUserExists.username,
        email: checkUserExists.email
      };

      return {
        statusCode: HttpStatus.OK,
        message: 'You have been logged in successfully.',
        accessToken: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload, {
          secret: jwt.rtSecretKey,
          expiresIn: '7d'
        })
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
        HttpStatus.CONFLICT
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
          statusCode: HttpStatus.OK,
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

    await this.sendOTPVerificationMail(email);

    return {
      statusCode: HttpStatus.OK,
      message:
        'Verification mail has been sent to your email address. Please check your inbox.'
    };
  }

  async resetPassword(@Body() request: resetPasswordDTO) {
    const { id, password } = request;

    const userExists = await this.userService.findById(id);

    if (!userExists)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    const hashedPassword = await hashInformation(password);

    await this.userRepository.update(id, { password: hashedPassword });

    return {
      statusCode: HttpStatus.OK,
      message: 'Password updated successfully.'
    };
  }

  async sendOTPVerificationMail(email: string) {
    const userExists = await this.userService.findByEmail(email);

    if (!userExists)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    const otp = generateOTP();

    await this.otpRepository.save({
      otpNumber: otp,
      expiresAt: await calculateExpirationDate(),
      createdAt: new Date().toISOString(),
      user: userExists
    });

    const template = `./otp`;
    // await this.mailService.sendEmail(email, 'Verify your email', template, otp);
    await this.mailService.sendOTPEmail(email, 'Verify your email', otp);

    return {
      statusCode: HttpStatus.OK,
      message:
        'Verification mail has been sent to your email address. Please check your inbox.'
    };
  }

  async verifyOTP(request: verifyOTPDTO) {
    const { id, otp } = request;

    const userExists = await this.userService.findById(id);

    if (!userExists)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    const userOTP = await this.otpRepository.findOne({
      where: {
        user: { id },
        otpNumber: otp
      }
    });

    if (userOTP) {
      if (new Date(userOTP.expiresAt) < new Date()) {
        throw new HttpException('OTP has expired.', HttpStatus.BAD_REQUEST);
      }

      await this.otpRepository.remove(userOTP);

      await this.userRepository.update(id, { verified: true });

      return {
        statusCode: HttpStatus.OK,
        message: 'Your email has been verified successfully.'
      };
    } else {
      throw new HttpException('OTP not found.', HttpStatus.NOT_FOUND);
    }
  }

  async refreshToken(request: refreshTokenDTO) {
    const decodedUser = await this.jwtService.verifyAsync(
      request.refreshToken,
      {
        secret: jwt.rtSecretKey
      }
    );

    const payload = {
      userId: decodedUser.id,
      name: decodedUser.username,
      email: decodedUser.email
    };

    return {
      statusCode: HttpStatus.OK,
      message: 'Access token has been refreshed successfully.',
      accessToken: this.jwtService.sign(payload)
    };
  }
}
