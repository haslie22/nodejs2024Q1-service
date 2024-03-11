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

  getUsers(): UserEntity[] {
    return this.users;
  }

  getUser(id: string): UserEntity {
    return this.users.find((user) => user.id === id);
  }

  createUser(userData: CreateUserDto): UserEntity {
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

  updateUser(id: string, userData: UpdateUserDto): UserEntity {
    const user = this.getUser(id);
    const timestamp = Date.now();

    Object.assign(user, {
      password: userData.newPassword,
      version: user.version + 1,
      updatedAt: timestamp,
    });

    return user;
  }

  deleteUser(id: string): UserEntity {
    const index = this.users.findIndex((user) => user.id === id);
    const user = this.users.splice(index, 1)[0];

    return user;
  }

  getTracks(): TrackEntity[] {
    return this.tracks;
  }

  getTrack(id: string): TrackEntity {
    return this.tracks.find((track) => track.id === id);
  }

  createTrack(trackData: CreateTrackDto): TrackEntity {
    const track: TrackEntity = {
      ...trackData,
      id: uuidv4(),
    };

    this.tracks.push(track);
    return track;
  }

  updateTrack(id: string, trackData: UpdateTrackDto): TrackEntity {
    const track = this.getTrack(id);

    Object.assign(track, trackData);

    return track;
  }

  deleteTrack(id: string): TrackEntity {
    const index = this.tracks.findIndex((track) => track.id === id);
    const track = this.tracks.splice(index, 1)[0];

    return track;
  }

  getArtists(): ArtistEntity[] {
    return this.artists;
  }

  getArtist(id: string): ArtistEntity {
    return this.artists.find((artist) => artist.id === id);
  }

  createArtist(artistData: CreateArtistDto): ArtistEntity {
    const artist: ArtistEntity = {
      id: uuidv4(),
      ...artistData,
    };

    this.artists.push(artist);
    return artist;
  }

  updateArtist(id: string, artistData: UpdateArtistDto): ArtistEntity {
    const artist = this.getArtist(id);

    Object.assign(artist, artistData);

    return artist;
  }

  deleteArtist(id: string): ArtistEntity {
    const index = this.artists.findIndex((artist) => artist.id === id);
    const artist = this.artists.splice(index, 1)[0];

    return artist;
  }

  getAlbums(): AlbumEntity[] {
    return this.albums;
  }

  getAlbum(id: string): AlbumEntity {
    return this.albums.find((album) => album.id === id);
  }

  createAlbum(albumData: CreateAlbumDto): AlbumEntity {
    const album: AlbumEntity = {
      id: uuidv4(),
      ...albumData,
    };

    this.albums.push(album);
    return album;
  }

  updateAlbum(id: string, albumData: UpdateAlbumDto): AlbumEntity {
    const album = this.getAlbum(id);

    Object.assign(album, albumData);

    return album;
  }

  deleteAlbum(id: string): AlbumEntity {
    const index = this.albums.findIndex((album) => album.id === id);
    const album = this.albums.splice(index, 1)[0];

    return album;
  }

  getFavorites(): FavoritesEntity {
    return this.favorites;
  }

  addTrackToFavorites(trackId: string): void {
    const existingTrack = this.favorites.tracks.find((id) => id === trackId);
    if (!existingTrack) this.favorites.tracks.push(trackId);
  }

  deleteTrackFromFavorites(trackId: string): void {
    const index = this.favorites.tracks.findIndex((id) => id === trackId);
    if (index !== -1) this.favorites.tracks.splice(index, 1);
  }

  addAlbumToFavorites(albumId: string): void {
    const existingAlbum = this.favorites.albums.find((id) => id === albumId);
    if (!existingAlbum) this.favorites.albums.push(albumId);
  }

  deleteAlbumFromFavorites(albumId: string): void {
    const index = this.favorites.albums.findIndex((id) => id === albumId);
    if (index !== -1) this.favorites.albums.splice(index, 1);
  }

  addArtistToFavorites(artistId: string): void {
    const existingArtist = this.favorites.artists.find((id) => id === artistId);
    if (!existingArtist) this.favorites.artists.push(artistId);
  }

  deleteArtistFromFavorites(artistId: string): void {
    const index = this.favorites.artists.findIndex((id) => id === artistId);
    if (index !== -1) this.favorites.artists.splice(index, 1);
  }
}
