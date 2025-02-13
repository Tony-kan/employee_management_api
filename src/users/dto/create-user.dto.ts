import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message:
      'valid role required. Please select a valid role from "INTERN", "ENGINEER", "ADMIN"',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
