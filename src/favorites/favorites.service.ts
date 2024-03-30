import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientErrorCode } from 'src/common/consts/consts';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const [artists, albums, tracks] = await Promise.all([
      this.prisma.artistInFavorites.findMany({ include: { artist: true } }),
      this.prisma.albumInFavorites.findMany({ include: { album: true } }),
      this.prisma.trackInFavorites.findMany({ include: { track: true } }),
    ]);

    return { artists, albums, tracks };
  }

  async addTrack(id: string) {
    try {
      return await this.prisma.trackInFavorites.create({
        data: { trackId: id },
      });
    } catch (error) {
      console.log(error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaClientErrorCode.RecordNotFound
      ) {
        throw new UnprocessableEntityException(
          `Track with id ${id} does not exist`,
        );
      }
      throw error;
    }
  }

  async deleteTrack(id: string) {
    return this.prisma.trackInFavorites.delete({ where: { trackId: id } });
  }

  async addAlbum(id: string) {
    try {
      return await this.prisma.albumInFavorites.create({
        data: { albumId: id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaClientErrorCode.RecordNotFound
      ) {
        throw new UnprocessableEntityException(
          `Album with id ${id} does not exist`,
        );
      }
      throw error;
    }
  }

  async deleteAlbum(id: string) {
    return this.prisma.albumInFavorites.delete({ where: { albumId: id } });
  }

  async addArtist(id: string) {
    try {
      return await this.prisma.artistInFavorites.create({
        data: { artistId: id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaClientErrorCode.RecordNotFound
      ) {
        throw new UnprocessableEntityException(
          `Artist with id ${id} does not exist`,
        );
      }
      throw error;
    }
  }

  async deleteArtist(id: string) {
    return this.prisma.artistInFavorites.delete({ where: { artistId: id } });
  }
}
