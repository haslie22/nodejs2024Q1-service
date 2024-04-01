import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Favorites')
@Controller('favs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Retrieve a list of all favorites.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Favorites found',
  })
  async getAll() {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Add track to favorites',
    description: 'Add track to favorites.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The UUID v4 of the track',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Track added to favorites',
  })
  async addTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The UUID v4 of the track',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Track deleted' })
  async deleteTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Add album to favorites',
    description: 'Add album to favorites.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The UUID v4 of the album',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Album added to favorites',
  })
  async addAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The UUID v4 of the album',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Album deleted',
  })
  async deleteAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Add artist to favorites',
    description: 'Add artist to favorites.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The UUID v4 of the artist',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Artist added to favorites',
  })
  async addArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The UUID v4 of the artist',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Artist deleted',
  })
  async deleteArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    return this.favoritesService.deleteArtist(id);
  }
}
