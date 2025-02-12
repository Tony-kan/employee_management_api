import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { updatedUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
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

  findAllUsers(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOneUser(id: string) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: CreateUserDto) {
    const newUser = {
      id: randomUUID(),
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, updatedUser: updatedUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOneUser(id);
  }

  deleteUser(id: string) {
    const removedUser = this.findOneUser(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
