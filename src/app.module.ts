import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ApplicationsModule } from './applications/applications.module';
import { DepartmentsModule } from './departments/departments.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { SalariesModule } from './salaries/salaries.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ApplicationsModule,
    DepartmentsModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 60,
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 60 * 60,
        limit: 100,
      },
      {
        name: 'long',
        ttl: 24 * 60 * 60,
        limit: 1000,
      },
    ]),
    MyLoggerModule,
    SalariesModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
