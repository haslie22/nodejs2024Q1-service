import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Database } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private db: Database) {}

  async getAll() {
    const favsIds = await this.db.getFavorites();
    const artists = (await this.db.getArtists()).filter((artist) =>
      favsIds.artists.includes(artist.id),
    );
    const albums = (await this.db.getAlbums()).filter((album) =>
      favsIds.albums.includes(album.id),
    );
    const tracks = (await this.db.getTracks()).filter((track) =>
      favsIds.tracks.includes(track.id),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrack(id: string) {
    const targetTrack = await this.db.getTrack(id);

    if (!targetTrack) {
      throw new UnprocessableEntityException(
        `Track with id ${id} does not exist`,
      );
    }

    return await this.db.addTrackToFavorites(id);
  }

  async deleteTrack(id: string) {
    const isFavorite = await this.db.findFavoriteTrack(id);

    if (!isFavorite) {
      throw new NotFoundException(`Track with id ${id} is not in favorites`);
    }

    return await this.db.deleteTrackFromFavorites(id);
  }

  async addAlbum(id: string) {
    const targetAlbum = await this.db.getAlbum(id);

    if (!targetAlbum) {
      throw new UnprocessableEntityException(
        `Album with id ${id} does not exist`,
      );
    }

    return await this.db.addAlbumToFavorites(id);
  }

  async deleteAlbum(id: string) {
    const isFavorite = await this.db.findFavoriteAlbum(id);

    if (!isFavorite) {
      throw new NotFoundException(`Album with id ${id} is not in favorites`);
    }

    return await this.db.deleteAlbumFromFavorites(id);
  }

  async addArtist(id: string) {
    const targetArtist = await this.db.getArtist(id);

    if (!targetArtist) {
      throw new UnprocessableEntityException(
        `Artist with id ${id} does not exist`,
      );
    }

    return await this.db.addArtistToFavorites(id);
  }

  async deleteArtist(id: string) {
    const isFavorite = await this.db.findFavoriteArtist(id);

    if (!isFavorite) {
      throw new NotFoundException(`Artist with id ${id} is not in favorites`);
    }

    return await this.db.deleteArtistFromFavorites(id);
  }
}
