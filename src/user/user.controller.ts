import { Controller, Get } from '@nestjs/common';

// GET /user
// GET /user/:id
// POST /user
// PUT /user/:id
// DELETE /user/:id

@Controller('user')
export class UserController {
  @Get()
  findAll() {
    return [];
  }
}
