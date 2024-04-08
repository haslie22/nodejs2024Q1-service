import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientErrorCode } from 'src/common/consts/consts';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.album.findMany();
  }

  async getOne(id: string) {
    const targetAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!targetAlbum) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return targetAlbum;
  }

  async create(album: CreateAlbumDto) {
    return await this.prisma.album.create({ data: album });
  }

  async update(id: string, albumData: UpdateAlbumDto) {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: albumData,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaClientErrorCode.RecordNotFound
      ) {
        throw new NotFoundException(`Album with id ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaClientErrorCode.RecordNotFound
      ) {
        throw new NotFoundException(`Album with id ${id} not found`);
      }
      throw error;
    }
  }
}
