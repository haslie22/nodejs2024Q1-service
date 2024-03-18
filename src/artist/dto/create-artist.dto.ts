import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'The name of the artist',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Indicates whether the artist has won a Grammy award',
    type: Boolean,
  })
  @IsBoolean()
  grammy: boolean;
}
