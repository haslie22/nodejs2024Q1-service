import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt').refreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is not provided');
    }

    try {
      const user = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('jwt').refreshSecret,
      });
      req.user = user;
    } catch {
      throw new ForbiddenException('Refresh token expired');
    }

    return true;
  }
}
