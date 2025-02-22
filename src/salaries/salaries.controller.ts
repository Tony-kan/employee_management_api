import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalariesService } from './salaries.service';
import { Prisma } from '@prisma/client';
// import { CreateSalaryDto } from './dto/create-salary.dto';
// import { UpdateSalaryDto } from './dto/update-salary.dto';

@Controller('salaries')
export class SalariesController {
  constructor(private readonly salariesService: SalariesService) {}

  @Post()
  create(@Body() createSalaryDto: Prisma.SalaryCreateInput) {
    return this.salariesService.create(createSalaryDto);
  }

  @Get()
  findAll() {
    return this.salariesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salariesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSalaryDto: Prisma.SalaryUpdateInput,
  ) {
    return this.salariesService.update(id, updateSalaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salariesService.remove(id);
  }
}
