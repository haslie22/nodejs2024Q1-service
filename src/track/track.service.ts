import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientErrorCode } from 'src/common/consts/consts';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.track.findMany();
  }

  async getOne(id: string) {
    const targetTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!targetTrack) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return targetTrack;
  }

  async create(track: CreateTrackDto) {
    return await this.prisma.track.create({ data: track });
  }

  async update(id: string, trackData: UpdateTrackDto) {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: trackData,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaClientErrorCode.RecordNotFound
      ) {
        throw new NotFoundException(`Track with id ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaClientErrorCode.RecordNotFound
      ) {
        throw new NotFoundException(`Track with id ${id} not found`);
      }
      throw error;
    }
  }
}
