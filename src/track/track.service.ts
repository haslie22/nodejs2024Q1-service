import { Injectable, NotFoundException } from '@nestjs/common';

import { Database } from 'src/database/database.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private db: Database) {}

  async getAll() {
    return await this.db.getTracks();
  }

  async getOne(id: string) {
    const targetTrack = await this.db.getTrack(id);

    if (!targetTrack) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return targetTrack;
  }

  async create(track: CreateTrackDto) {
    return await this.db.createTrack(track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const targetTrack = await this.db.getTrack(id);

    if (!targetTrack) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return await this.db.updateTrack(id, updateTrackDto);
  }

  async delete(id: string) {
    const targetTrack = await this.db.getTrack(id);

    if (!targetTrack) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return await this.db.deleteTrack(id);
  }
}
