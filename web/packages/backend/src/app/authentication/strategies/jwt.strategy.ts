import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //extracts the JWT from the request
      //it supplies a bearer token in the Authorization header of our API requests
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //ensure that the token isnt expired, if so, the request will be denied
      ignoreExpiration: false,
      //importing the secret
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { _id: payload.sub, username: payload.username };
  }
}
