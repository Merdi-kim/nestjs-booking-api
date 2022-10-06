import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInitialMessage(): string {
    return 'Welcome to our booking api';
  }
}
