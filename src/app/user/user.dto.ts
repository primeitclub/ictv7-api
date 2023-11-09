import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class usersDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'password is required'
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'username is required'
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'phone is required'
  })
  @IsPhoneNumber('IN', {
    message: 'phone must be a valid phone number'
  })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'address is required'
  })
  address: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'TnC flag is required'
  })
  TnCFlag: boolean;
}
