import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthEntity } from './auth.entity';
import { UserService } from 'src/user/user.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';

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
  @ApiOperation({
    summary: 'Sign up a user',
    description: 'Sign up a user with login and password.',
  })
  @ApiCreatedResponse({
    description: 'User signed up successfully',
    type: AuthEntity,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @HttpCode(201)
  async signup(@Body(new ValidationPipe()) { login, password }: LoginDto) {
    return this.userService.create({ login, password });
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get new tokens',
    description: 'Get new tokens with refresh token.',
  })
  @ApiCreatedResponse({
    description: 'User refreshed his tokens successfully',
    type: AuthEntity,
  })
  async refresh(
    @Body(new ValidationPipe({ errorHttpStatusCode: 401 }))
    refreshToken: RefreshTokenDto,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token in request body');
    }

    return this.authService.refresh(refreshToken);
  }
}
