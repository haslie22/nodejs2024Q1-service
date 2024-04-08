import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientErrorCode } from 'src/common/consts/consts';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const [dbArtists, dbAlbums, dbTracks] = await Promise.all([
      this.prisma.artistInFavorites.findMany({ include: { artist: true } }),
      this.prisma.albumInFavorites.findMany({ include: { album: true } }),
      this.prisma.trackInFavorites.findMany({ include: { track: true } }),
    ]);

    const artists = dbArtists.map((artist) => artist.artist);
    const albums = dbAlbums.map((album) => album.album);
    const tracks = dbTracks.map((track) => track.track);

    return { artists, albums, tracks };
  }

  async addTrack(id: string) {
    try {
      return await this.prisma.trackInFavorites.createMany({
        data: { trackId: id },
        skipDuplicates: true,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaClientErrorCode.ForeignKeyViolation
      ) {
        throw new UnprocessableEntityException(
          `Track with id ${id} does not exist`,
        );
      } else throw error;
    }
  }

  async deleteTrack(id: string) {
    return this.prisma.trackInFavorites.delete({ where: { trackId: id } });
  }

  async addAlbum(id: string) {
    try {
      return await this.prisma.albumInFavorites.createMany({
        data: { albumId: id },
        skipDuplicates: true,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaClientErrorCode.ForeignKeyViolation
      ) {
        throw new UnprocessableEntityException(
          `Album with id ${id} does not exist`,
        );
      } else throw error;
    }
  }

  async deleteAlbum(id: string) {
    return this.prisma.albumInFavorites.delete({ where: { albumId: id } });
  }

  async addArtist(id: string) {
    try {
      return await this.prisma.artistInFavorites.createMany({
        data: { artistId: id },
        skipDuplicates: true,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaClientErrorCode.ForeignKeyViolation
      ) {
        throw new UnprocessableEntityException(
          `Artist with id ${id} does not exist`,
        );
      } else throw error;
    }
  }

  async deleteArtist(id: string) {
    return this.prisma.artistInFavorites.delete({ where: { artistId: id } });
  }
}
