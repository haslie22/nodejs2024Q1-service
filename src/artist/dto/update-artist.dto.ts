import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({
    description: 'The name of the artist (optional)',
    required: false,
    type: String,
  })
  name?: string;

  @ApiProperty({
    description:
      'Indicates whether the artist has won a Grammy award (optional)',
    required: false,
    type: Boolean,
  })
  grammy?: boolean;
}
