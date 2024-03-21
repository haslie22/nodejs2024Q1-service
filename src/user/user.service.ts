import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Database } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { omit } from 'src/common/helpers/omit';

@Injectable()
export class UserService {
  constructor(private db: Database) {}

  async getAll() {
    const users = await this.db.getUsers();

    return users.map((user) => omit(user, ['password']));
  }

  async getOne(id: string) {
    const targetUser = await this.db.getUser(id);

    if (!targetUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return omit(targetUser, ['password']);
  }

  async create(user: CreateUserDto) {
    // const existingUser = await this.db.getUserByLogin(user.login);

    // if (existingUser) {
    //   throw new ConflictException(
    //     `User with login ${user.login} already exists`,
    //   );
    // }

    return omit(await this.db.createUser(user), ['password']);
  }

  async update(id: string, userData: UpdateUserDto) {
    const targetUser = await this.db.getUser(id);

    if (!targetUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (targetUser.password !== userData.oldPassword) {
      throw new ForbiddenException('Previous password is incorrect');
    }

    return omit(await this.db.updateUser(id, userData), ['password']);
  }

  async delete(id: string) {
    const targetUser = await this.db.getUser(id);

    if (!targetUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.db.deleteUser(id);
  }
}
