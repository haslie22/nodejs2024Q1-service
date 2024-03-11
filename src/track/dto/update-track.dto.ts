import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger decorators

import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty({
    description: 'The name of the track (optional)',
    required: false,
    type: String,
  })
  name?: string;

  @ApiProperty({
    description: 'The ID of the artist (if available) (optional)',
    type: String,
    format: 'uuid',
    required: false,
  })
  artistId?: string;

  @ApiProperty({
    description: 'The ID of the album (if available) (optional)',
    type: String,
    format: 'uuid',
    required: false,
  })
  albumId?: string;

  @ApiProperty({
    description: 'The duration of the track in seconds (optional)',
    required: false,
    type: Number,
  })
  duration?: number;
}
