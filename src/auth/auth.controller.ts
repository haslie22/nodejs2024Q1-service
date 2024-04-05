import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
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
    description: 'Log in a user with login and password to get access tokens.',
  })
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: AuthEntity,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiForbiddenResponse({ description: 'Authentication failed' })
  async login(
    @Body(new ValidationPipe()) { login, password }: LoginDto,
  ): Promise<AuthEntity> {
    return this.authService.login(login, password);
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Sign up a user',
    description: 'Create a new user with login and password.',
  })
  @ApiCreatedResponse({
    description: 'User signed up successfully',
    type: AuthEntity,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body(new ValidationPipe()) { login, password }: LoginDto) {
    return this.userService.create({ login, password });
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Use refresh token to get a new pair of access tokens.',
  })
  @ApiOkResponse({
    description: 'Tokens refreshed successfully',
    type: AuthEntity,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token' })
  @ApiForbiddenResponse({ description: 'Authentication failed' })
  async refresh(
    @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.UNAUTHORIZED }))
    refreshToken: RefreshTokenDto,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token in request body');
    }

    return this.authService.refresh(refreshToken);
  }
}
