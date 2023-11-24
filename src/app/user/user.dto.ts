import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserType } from '../user/user.enum';

export class addUsersDTO {
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
    message: 'Password field is required.'
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'User Type field is required.'
  })
  user_type: UserType;
}

export class updateUsersDTO {
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
    message: 'Password field is required.'
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'User Type field is required.'
  })
  user_type: UserType;
}
