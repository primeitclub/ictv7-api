import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwt } from 'src/config/env';

export class JwtStratgegy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.secretKey
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      expired: payload.exp
    };
  }
}
