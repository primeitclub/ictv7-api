import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/User.entity';
import { OTP } from './model/Otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, OTP])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
