import { Injectable} from '@nestjs/common';

@Injectable()
export class AppService {


  getHello(): string {
    console.log('get')
    return 'Hello World!';
  }
}
