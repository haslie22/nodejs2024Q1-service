import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { FavoritesEntity } from 'src/favorites/favorites.entity';
import { TrackEntity } from 'src/track/track.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/user.entity';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';

// TODO: split into several classes (i.e. tables)

@Injectable()
export class Database {
  private users: UserEntity[] = [];
  private artists: ArtistEntity[] = [];
  private tracks: TrackEntity[] = [];
  private albums: AlbumEntity[] = [];
  private favorites: FavoritesEntity = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async getUsers(): Promise<UserEntity[]> {
    return this.users;
  }

  async getUser(id: string): Promise<UserEntity> {
    return this.users.find((user) => user.id === id);
  }

  async createUser(userData: CreateUserDto): Promise<UserEntity> {
    const timestamp = Date.now();

    const user: UserEntity = {
      ...userData,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
      id: uuidv4(),
    };

    this.users.push(user);
    return user;
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getUser(id);
    const timestamp = Date.now();

    Object.assign(user, {
      password: userData.newPassword,
      version: user.version + 1,
      updatedAt: timestamp,
    });

    return user;
  }

  async deleteUser(id: string): Promise<UserEntity> {
    const index = this.users.findIndex((user) => user.id === id);
    const user = this.users.splice(index, 1)[0];

    return user;
  }

  async getTracks(): Promise<TrackEntity[]> {
    return this.tracks;
  }

  async getTrack(id: string): Promise<TrackEntity> {
    return this.tracks.find((track) => track.id === id);
  }

  async createTrack(trackData: CreateTrackDto): Promise<TrackEntity> {
    const track: TrackEntity = {
      ...trackData,
      id: uuidv4(),
    };

    this.tracks.push(track);
    return track;
  }

  async updateTrack(
    id: string,
    trackData: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track = await this.getTrack(id);

    Object.assign(track, trackData);

    return track;
  }

  async deleteTrack(id: string): Promise<TrackEntity> {
    const index = this.tracks.findIndex((track) => track.id === id);
    const track = this.tracks.splice(index, 1)[0];

    return track;
  }

  async getArtists(): Promise<ArtistEntity[]> {
    return this.artists;
  }

  async getArtist(id: string): Promise<ArtistEntity> {
    return this.artists.find((artist) => artist.id === id);
  }

  async createArtist(artistData: CreateArtistDto): Promise<ArtistEntity> {
    const artist: ArtistEntity = {
      id: uuidv4(),
      ...artistData,
    };

    this.artists.push(artist);
    return artist;
  }

  async updateArtist(
    id: string,
    artistData: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.getArtist(id);

    Object.assign(artist, artistData);

    return artist;
  }

  async deleteArtist(id: string): Promise<ArtistEntity> {
    const index = this.artists.findIndex((artist) => artist.id === id);
    const artist = this.artists.splice(index, 1)[0];

    return artist;
  }

  async getAlbums(): Promise<AlbumEntity[]> {
    return this.albums;
  }

  async getAlbum(id: string): Promise<AlbumEntity> {
    return this.albums.find((album) => album.id === id);
  }

  async createAlbum(albumData: CreateAlbumDto): Promise<AlbumEntity> {
    const album: AlbumEntity = {
      id: uuidv4(),
      ...albumData,
    };

    this.albums.push(album);
    return album;
  }

  async updateAlbum(
    id: string,
    albumData: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = await this.getAlbum(id);

    Object.assign(album, albumData);

    return album;
  }

  async deleteAlbum(id: string): Promise<AlbumEntity> {
    const index = this.albums.findIndex((album) => album.id === id);
    const album = this.albums.splice(index, 1)[0];

    return album;
  }

  async getFavorites(): Promise<FavoritesEntity> {
    return this.favorites;
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    const existingTrack = this.favorites.tracks.find((id) => id === trackId);
    if (!existingTrack) this.favorites.tracks.push(trackId);
  }

  async deleteTrackFromFavorites(trackId: string): Promise<void> {
    const index = this.favorites.tracks.findIndex((id) => id === trackId);
    if (index !== -1) this.favorites.tracks.splice(index, 1);
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    const existingAlbum = this.favorites.albums.find((id) => id === albumId);
    if (!existingAlbum) this.favorites.albums.push(albumId);
  }

  async deleteAlbumFromFavorites(albumId: string): Promise<void> {
    const index = this.favorites.albums.findIndex((id) => id === albumId);
    if (index !== -1) this.favorites.albums.splice(index, 1);
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    const existingArtist = this.favorites.artists.find((id) => id === artistId);
    if (!existingArtist) this.favorites.artists.push(artistId);
  }

  async deleteArtistFromFavorites(artistId: string): Promise<void> {
    const index = this.favorites.artists.findIndex((id) => id === artistId);
    if (index !== -1) this.favorites.artists.splice(index, 1);
  }
}
