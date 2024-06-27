import { Injectable } from '@tsed/di';

@Injectable()
export class HelloWorldService {
  getHelloWorld() {
    return 'Hello World';
  }
}
