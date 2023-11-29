import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwt } from 'src/config/env';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/model/User.entity';

export class JwtStratgegy extends PassportStrategy(Strategy) {
  constructor(
    //! yo inject garen abhane error aucha so repo na hatu hai use na bhaye ni
    @InjectRepository(User)
    private readonly userServices: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.atSecretKey
    });
  }

  async validate(payload: any) {
    console.log(payload);
    const user = await this.userServices.findByEmail(payload.email);
    return { ...user };
  }
}
