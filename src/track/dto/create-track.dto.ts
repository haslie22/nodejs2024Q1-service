import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    description: 'The name of the track',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The ID of the artist (if available) (optional)',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  artistId: string;

  @ApiProperty({
    description: 'The ID of the album (if available) (optional)',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  albumId: string;

  @ApiProperty({
    description: 'The duration of the track in seconds',
    type: Number,
  })
  @IsInt()
  duration: number;
}
