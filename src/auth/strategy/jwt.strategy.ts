import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Only for validating the JWT token,
// I handle issuing the token in the auth.service.ts
// to-do: research social login strategies
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // passportjs "validates" the token signature for you and
  // appends the returned object to the request object as req.user
  // you can query the database here to get the user object,
  // or for more security.
  validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
