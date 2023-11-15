import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/model/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from 'src/config/env';
import { JwtStratgegy } from './jwt.strategy';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwt.secretKey,
      signOptions: {
        expiresIn: jwt.expiresIn
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    MailService,
    JwtStratgegy,
    GoogleStrategy
  ]
})
export class AuthModule {}
