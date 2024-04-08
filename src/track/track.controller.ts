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
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Track')
@Controller('track')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all tracks',
    description: 'Retrieve a list of all tracks.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tracks found',
  })
  async getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a track by ID',
    description: 'Retrieve a track by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'The UUID v4 of the track',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Track found',
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
    return this.trackService.getOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new track',
    description: 'Create a new track.',
  })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Track created',
  })
  async create(@Body(new ValidationPipe()) createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a track',
    description: 'Update an existing track by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'The UUID v4 of the track',
    type: String,
  })
  @ApiBody({ type: UpdateTrackDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Track updated',
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
    @Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a track',
    description: 'Delete a track by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'The UUID v4 of the track',
    type: String,
  })
  @HttpCode(204)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Track deleted',
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
    await this.trackService.delete(id);
  }
}
