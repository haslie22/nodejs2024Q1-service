import * as bcrypt from 'bcrypt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from './../prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthEntity } from './auth.entity';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService,
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

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async refresh(token: RefreshTokenDto): Promise<AuthEntity> {
    const userToken = await this.prisma.token.findUnique({
      where: { refreshToken: token.refreshToken },
    });

    if (!userToken) throw new ForbiddenException('Invalid refresh token');

    const targetUser = await this.userService.getOne(userToken.userId);
    await this.prisma.token.delete({ where: { userId: targetUser.id } });

    const tokens = await this.getTokens(targetUser.id, targetUser.login);
    console.log('🚀 ~ AuthService ~ refresh ~ tokens:', tokens);
    await this.updateRefreshToken(targetUser.id, tokens.refreshToken);

    return tokens;
  }

  private async getTokens(userId: string, login: string) {
    const payload = { userId, login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt').accessSecret,
      expiresIn: this.configService.get('jwt').accessTokenExpiration,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt').refreshSecret,
      expiresIn: this.configService.get('jwt').refreshTokenExpiration,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    await this.prisma.token.upsert({
      where: { userId },
      update: { refreshToken },
      create: { userId, refreshToken },
    });
  }
}
