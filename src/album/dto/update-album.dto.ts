import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty({
    description: 'The name of the album (optional)',
    required: false,
    type: String,
  })
  name?: string;

  @ApiProperty({
    description: 'The year the album was released (optional)',
    required: false,
    type: Number,
  })
  year?: number;

  @ApiProperty({
    description: 'The ID of the artist (if available) (optional)',
    required: false,
    type: String,
    format: 'uuid',
  })
  artistId?: string;
}
