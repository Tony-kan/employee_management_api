import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
// import { CreateSalaryDto } from './dto/create-salary.dto';
// import { UpdateSalaryDto } from './dto/update-salary.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SalariesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createSalaryDto: Prisma.SalaryCreateInput) {
    return this.databaseService.salary.create({
      data: createSalaryDto,
    });
  }

  findAll() {
    return this.databaseService.salary.findMany();
  }

  findOne(id: string) {
    return this.databaseService.salary.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateSalaryDto: Prisma.SalaryUpdateInput) {
    return this.databaseService.salary.update({
      where: {
        id,
      },
      data: updateSalaryDto,
    });
  }

  remove(id: string) {
    return this.databaseService.salary.delete({
      where: {
        id,
      },
    });
  }
}
