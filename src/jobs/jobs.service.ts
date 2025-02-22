import { Injectable } from '@nestjs/common';
// import { CreateJobDto } from './dto/create-job.dto';
// import { UpdateJobDto } from './dto/update-job.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class JobsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createJobDto: Prisma.JobCreateInput) {
    return this.databaseService.job.create({
      data: createJobDto,
    });
  }

  findAll() {
    return this.databaseService.job.findMany();
  }

  findOne(id: string) {
    return this.databaseService.job.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateJobDto: Prisma.JobUpdateInput) {
    return this.databaseService.job.update({
      where: {
        id,
      },
      data: updateJobDto,
    });
  }

  remove(id: string) {
    return this.databaseService.job.delete({
      where: {
        id,
      },
    });
  }
}
