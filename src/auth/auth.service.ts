import * as bcrypt from 'bcrypt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from './../prisma/prisma.service';
import { AuthEntity } from './auth.entity';

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

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
