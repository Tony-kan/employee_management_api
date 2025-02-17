import { Injectable } from '@nestjs/common';
// import { CreateEmployeeDto } from './dto/create-employee.dto';
// import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  findAll() {
    // if (role)
    //   return this.databaseService.user.findMany({
    //     where: {
    //       role,
    //     },
    //   });

    return this.databaseService.employee.findMany();
  }

  findOne(id: string) {
    return this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  remove(id: string) {
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
