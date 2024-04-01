import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthEntity } from './auth.entity';
import { UserService } from 'src/user/user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Log in a user',
    description: 'Log in a user with login and password.',
  })
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: AuthEntity,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  async login(
    @Body(new ValidationPipe()) { login, password }: LoginDto,
  ): Promise<AuthEntity> {
    return this.authService.login(login, password);
  }

  @Post('signup')
  @HttpCode(201)
  async signup(@Body(new ValidationPipe()) { login, password }: LoginDto) {
    return this.userService.create({ login, password });
  }
}
