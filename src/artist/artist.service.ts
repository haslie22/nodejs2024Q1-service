import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientErrorCode } from 'src/common/consts/consts';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.artist.findMany();
  }

  async getOne(id: string) {
    const targetArtist = await this.prisma.artist.findUnique({ where: { id } });

    if (!targetArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return targetArtist;
  }

  async create(artist: CreateArtistDto) {
    return await this.prisma.artist.create({ data: artist });
  }

  async update(id: string, artistData: UpdateArtistDto) {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: artistData,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaClientErrorCode.RecordNotFound
      ) {
        throw new NotFoundException(`Artist with id ${id} not found`);
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
        throw new NotFoundException(`Artist with id ${id} not found`);
      }
      throw error;
    }
  }
}
