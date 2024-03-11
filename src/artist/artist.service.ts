import { Injectable, NotFoundException } from '@nestjs/common';

import { Database } from 'src/database/database.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: Database) {}

  async getAll() {
    return await this.db.getArtists();
  }

  async getOne(id: string) {
    const targetArtist = await this.db.getArtist(id);

    if (!targetArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return targetArtist;
  }

  async create(artist: CreateArtistDto) {
    return await this.db.createArtist(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const targetArtist = await this.db.getArtist(id);

    if (!targetArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return await this.db.updateArtist(id, updateArtistDto);
  }

  async delete(id: string) {
    const targetArtist = await this.db.getArtist(id);

    if (!targetArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const artistTracks = await this.db.getTracksByArtist(id);
    const artistAlbums = await this.db.getAlbumsByArtist(id);

    artistTracks.map((track) => (track.artistId = null));
    artistAlbums.map((album) => (album.artistId = null));

    return await this.db.deleteArtist(id);
  }
}
