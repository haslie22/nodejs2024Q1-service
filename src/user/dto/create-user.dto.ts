import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The login name of the user',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
