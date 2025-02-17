import { Injectable } from '@nestjs/common';
// import { CreateApplicationDto } from './dto/create-application.dto';
// import { UpdateApplicationDto } from './dto/update-application.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createApplicationDto: Prisma.ApplicationCreateInput) {
    return this.databaseService.application.create({
      data: createApplicationDto,
    });
  }

  findAll() {
    return this.databaseService.application.findMany();
  }

  findOne(id: string) {
    return this.databaseService.application.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateApplicationDto: Prisma.ApplicationUpdateInput) {
    return this.databaseService.application.update({
      where: {
        id,
      },
      data: updateApplicationDto,
    });
  }

  remove(id: string) {
    return this.databaseService.application.delete({
      where: {
        id,
      },
    });
  }
}
