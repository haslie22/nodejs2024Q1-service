import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The unique identifier of the user (UUID v4)',
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'The login name of the user',
    type: String,
  })
  login: string;

  @ApiProperty({
    description: 'The version of the user entity, incremented on update',
    type: Number,
  })
  version: number;

  @ApiProperty({
    description: 'The timestamp of creation of the user entity',
    type: Number,
  })
  createdAt: number;

  @ApiProperty({
    description: 'The timestamp of last update of the user entity',
    type: Number,
  })
  updatedAt: number;
}
