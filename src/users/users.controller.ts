import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get() //GET /users or /users?role=value
  findAllUsers(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return [];
  }

  @Get('interns') //GET /users/interns
  findAllInterns() {
    return [];
  }

  @Get(':id') //GET /users/:id
  findOneUser(@Param('id') id: string) {
    return { id };
  }

  @Post() //POST /users
  createUser(@Body() user: { name: string }) {
    return user;
  }

  @Patch(':id') //PATCH /users/:id
  patchUser(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id') //DELETE /users/:id
  deleteUser(@Param('id') id: string) {
    return { id };
  }
}
