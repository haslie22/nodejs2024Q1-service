import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'The name of the album',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The year the album was released',
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'The ID of the artist (if available)',
    type: String,
    required: false,
  })
  @IsUUID()
  @IsOptional()
  artistId: string;
}
