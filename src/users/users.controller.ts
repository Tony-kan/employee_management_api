import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updatedUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() //GET /users or /users?role=value
  findAllUsers(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAllUsers(role);
  }

  @Get(':id') //GET /users/:id
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @Post() //POST /users
  createUser(
    @Body(ValidationPipe)
    newUser: CreateUserDto,
  ) {
    return this.usersService.createUser(newUser);
  }

  @Patch(':id') //PATCH /users/:id
  updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updatedUser: updatedUserDto,
  ) {
    return this.usersService.updateUser(id, updatedUser);
  }

  @Delete(':id') //DELETE /users/:id
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
