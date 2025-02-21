import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
// import { randomUUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { updatedUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
// import { hashingPassword2 } from 'util';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  private users = [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Tony Kanyamuka',
      email: 'tony.kanyamuka@example.com',
      role: 'ADMIN',
    },
    {
      id: '6f9619ff-8b86-d011-b42d-00cf4fc964ff',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'ENGINEER',
    },
    {
      id: '7f3d5d50-b5de-4f69-8f10-ef2e7fb7a5b8',
      name: 'Michael Smith',
      email: 'michael.smith@example.com',
      role: 'INTERN',
    },
    {
      id: '95b7c82b-634f-48c7-9a62-4f4cb1d0a07e',
      name: 'Sarah Lee',
      email: 'sarah.lee@example.com',
      role: 'ENGINEER',
    },
    {
      id: '3c1e2b69-fadf-4e4c-b1df-7c9b1a2c8e5a',
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'ADMIN',
    },
  ];

  findAllUsers(
    role?: 'INTERN' | 'ENGINEER' | 'ADMIN' | 'MANAGER' | 'EMPLOYEE',
  ) {
    // if (role) {
    //   const roleArray = this.users.filter((user) => user.role === role);
    //   if (roleArray.length === 0)
    //     throw new NotFoundException(`User with role ${role} not found`);
    //   return roleArray;
    // }
    // return this.users;
    if (role) {
      return this.databaseService.user.findMany({
        where: {
          role,
        },
      });
    }

    return this.databaseService.user.findMany();
  }

  async findOneUser(id: string) {
    // const user = this.users.find((user) => user.id === id);

    // if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneUserByEmail(email: string) {
    // const user = this.users.find((user) => user.email === email);

    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);

    return this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(userData: Prisma.UserCreateInput) {
    // const existingUser = this.users.find(
    //   (user) => user.email === userData.email,
    // );

    // if (existingUser)
    //   throw new ConflictException(
    //     `User with email ${userData.email} already exists`,
    //   );

    // const newUser = {
    //   id: randomUUID(),
    //   ...userData,
    // };
    // this.users.push(newUser);

    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const saltOrRounds = 10;
    // const password = 'random_password';
    const hash = await bcrypt.hash(userData.password, saltOrRounds);
    // const hash: string = await hashingPassword2(userData.password);
    // const hashed: string = hash.toString();

    const existingUser = await this.databaseService.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (existingUser)
      throw new ConflictException(
        `User with email ${userData.email} already exists`,
      );

    return this.databaseService.user.create({
      data: {
        ...userData,
        password: hash,
      },
    });
  }

  updateUser(id: string, updatedUser: Prisma.UserUpdateInput) {
    // this.users = this.users.map((user) => {
    //   if (user.id === id) {
    //     return { ...user, ...updatedUser };
    //   }
    //   return user;
    // });

    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updatedUser,
    });
  }

  deleteUser(id: string) {
    // const removedUser = this.findOneUser(id);
    // this.users = this.users.filter((user) => user.id !== id);

    // return removedUser;
    return this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
