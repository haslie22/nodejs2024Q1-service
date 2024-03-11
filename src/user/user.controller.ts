import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ClassSerializerInterceptor } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve a list of all users.',
  })
  @ApiOkResponse({
    description: 'Retrieved users successfully',
    type: [UserDto],
  })
  async getAll(): Promise<UserDto[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Retrieve a user by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'The UUID v4 of the user',
    type: String,
  })
  @ApiOkResponse({ description: 'Retrieved user successfully', type: UserDto })
  @ApiBadRequestResponse({ description: 'Invalid UUID format' })
  async getOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ): Promise<UserDto> {
    return await this.userService.getOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user.',
  })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: UserDto,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a user',
    description: 'Update an existing user by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'The UUID v4 of the user',
    type: String,
  })
  @ApiOkResponse({ description: 'User updated successfully', type: UserDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiBadRequestResponse({ description: 'Invalid UUID format' })
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Delete a user by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'The UUID v4 of the user',
    type: String,
  })
  @ApiNoContentResponse({ description: 'User deleted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid UUID format' })
  @HttpCode(204)
  async delete(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ): Promise<void> {
    await this.userService.delete(id);
  }
}
