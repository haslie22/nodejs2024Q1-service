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
} from '@nestjs/swagger';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Artist')
@Controller('artist')
@UseGuards(JwtAuthGuard)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Retrieve a list of all artists.',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Artists found' })
  async getAll() {
    return await this.artistService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an artist by ID',
    description: 'Retrieve an artist by his unique identifier.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The UUID v4 of the artist',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Artist found',
  })
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
    return await this.artistService.getOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new artist',
    description: 'Create a new artist.',
  })
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Artist created',
  })
  async create(@Body(new ValidationPipe()) createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an artist',
    description: 'Update an existing artist by his unique identifier.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The UUID v4 of the artist',
  })
  @ApiBody({ type: UpdateArtistDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Artist updated',
  })
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
    @Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an artist',
    description: 'Delete an artist by his unique identifier.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The UUID v4 of the artist',
  })
  @HttpCode(204)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Artist deleted',
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
    await this.artistService.delete(id);
  }
}
