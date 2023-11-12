import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signInWithGoogle(req) {
    console.log(req.user);
  }
}
