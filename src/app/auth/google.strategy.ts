import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { google } from 'src/config/env';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: google.clientId,
      clientSecret: google.clientSecret,
      callbackURL: google.callBackURL,
      scope: ['email', 'profile']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      username: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      accessToken,
      refreshToken
    };

    done(null, user);
  }
}
