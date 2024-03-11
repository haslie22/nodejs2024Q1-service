import { Injectable, NotFoundException } from '@nestjs/common';

import { Database } from 'src/database/database.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: Database) {}

  async getAll() {
    return await this.db.getAlbums();
  }

  async getOne(id: string) {
    const targetAlbum = await this.db.getAlbum(id);

    if (!targetAlbum) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return targetAlbum;
  }

  async create(album: CreateAlbumDto) {
    return await this.db.createAlbum(album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const targetAlbum = await this.db.getAlbum(id);

    if (!targetAlbum) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return await this.db.updateAlbum(id, updateAlbumDto);
  }

  async delete(id: string) {
    const targetAlbum = await this.db.getAlbum(id);

    if (!targetAlbum) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    const albumTracks = await this.db.getTracksByAlbum(id);

    albumTracks.map((track) => (track.albumId = null));

    return await this.db.deleteAlbum(id);
  }
}
