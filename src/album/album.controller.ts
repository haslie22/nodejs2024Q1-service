import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Album')
@Controller('album')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all albums',
    description: 'Retrieve a list of all albums.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Albums found',
  })
  async getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an album by ID',
    description: 'Retrieve an album by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The UUID v4 of the album',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Album found' })
  async getOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    return this.albumService.getOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new album',
    description: 'Create a new album.',
  })
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Album created',
  })
  async create(@Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an album',
    description: 'Update an album track by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The UUID v4 of the album',
  })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Album updated' })
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
    @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an album',
    description: 'Delete an album by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The UUID v4 of the album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Album deleted',
  })
  async delete(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    await this.albumService.delete(id);
  }
}
