import * as bcrypt from 'bcrypt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from './../prisma/prisma.service';
import { AuthEntity } from './auth.entity';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(login: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { login } });

    if (!user) {
      throw new ForbiddenException(`No user found for login: ${login}`);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Invalid password');
    }

    return this.getTokens(user.id, user.login);
  }

  async refresh(token: RefreshTokenDto): Promise<AuthEntity> {
    const { userId, login } = this.jwtService.verify(token.refreshToken, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    return this.getTokens(userId, login);
  }

  async getTokens(userId: string, login: string) {
    const payload = { userId, login };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
