import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateDepartmentDto } from './dto/create-department.dto';
// import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DepartmentsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createDepartmentDto: Prisma.DepartmentCreateInput) {
    return this.databaseService.department.create({
      data: createDepartmentDto,
    });
  }

  findAll() {
    return this.databaseService.department.findMany();
  }

  findOne(id: string) {
    return this.databaseService.department.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateDepartmentDto: Prisma.DepartmentUpdateInput) {
    // const existingDepartment = this.databaseService.department.findUnique({
    //   where: {
    //     id,
    //   },
    // });
    // if (!existingDepartment)
    //   throw new NotFoundException(`Department with id ${id} not found`);

    return this.databaseService.department.update({
      where: {
        id,
      },
      data: updateDepartmentDto,
    });
  }

  remove(id: string) {
    return this.databaseService.department.delete({
      where: {
        id,
      },
    });
  }
}
