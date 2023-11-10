import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class usersDto {
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

  @ApiProperty()
  @IsNotEmpty({
    message: 'Username field is required.'
  })
  username: string;

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
    message: 'Address field is required.'
  })
  address: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Terms and conditions field is required.'
  })
  TnCFlag: boolean;
}
