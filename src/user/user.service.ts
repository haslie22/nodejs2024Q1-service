import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientErrorCode } from 'src/common/consts/consts';
import { prismaExclude } from 'src/common/helpers/prismaExclude';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany({
      select: prismaExclude('User', ['password']),
    });

    return users;
  }

  async getOne(id: string) {
    const targetUser = await this.prisma.user.findUnique({
      where: { id },
      select: prismaExclude('User', ['password']),
    });

    if (!targetUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return targetUser;
  }

  async create(user: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: user,
      select: prismaExclude('User', ['password']),
    });

    return newUser;
  }

  async update(id: string, userData: UpdateUserDto) {
    const targetUser = await this.prisma.user.findUnique({ where: { id } });

    if (!targetUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (targetUser.password !== userData.oldPassword) {
      throw new ForbiddenException('Previous password is incorrect');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: userData.newPassword,
        version: { increment: 1 },
      },
      select: prismaExclude('User', ['password']),
    });

    return updatedUser;
  }

  async delete(id: string) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaClientErrorCode.RecordNotFound
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }
}
