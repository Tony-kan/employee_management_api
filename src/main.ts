import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Employee Management System')
    .setDescription(
      'This API allows you to manage employees, including creating, updating, retrieving, and deleting employee records.',
    )
    .setVersion('1.0')
    .addTag('Employee')
    .setLicense('MIT', 'https://opensource.org/license/mit')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
