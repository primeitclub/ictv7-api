import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class registerUserDTO {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Username field is required.'
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Email field is required.'
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Phone number field is required.'
  })
  @IsPhoneNumber('NE', {
    message: 'Phone number must be a valid phone number.'
  })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Password field is required.'
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Address field is required.'
  })
  address: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'College name field is required.'
  })
  college_name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Terms and conditions field is required.'
  })
  TnCFlag: boolean;
}

export class loginUserDTO {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Email field is required.'
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Password field is required.'
  })
  password: string;
}

export class forgotPasswordDTO {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Email field is required.'
  })
  email: string;
}

export class resetPasswordDTO {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Id field is required.'
  })
  id: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Token field is required.'
  })
  token: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Password field is required.'
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Password confirmation field is required.'
  })
  passwordConfirmation: string;
}

export class sendOTPVerificationMailDTO {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Email field is required.'
  })
  email: string;
}

export class verifyOTPDTO {
  @ApiProperty()
  @IsNotEmpty({
    message: 'User id field is required.'
  })
  id: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'OTP field is required.'
  })
  otp: number;
}
