import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Documented Api running : https://localhost:3000/api`;
  }
}
