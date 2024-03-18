import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The old password of the user',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: 'The new password of the user',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
