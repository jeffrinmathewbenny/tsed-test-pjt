import { Controller, Inject } from '@tsed/di';
import { Get } from '@tsed/schema';
import { HelloWorldService } from './HelloWorldService';
import { UseBefore } from '@tsed/platform-middlewares';
import { AuthenticationMiddleware } from '../../middlewares/AuthenticationMiddleware';

@Controller('/hello-world')
@UseBefore(AuthenticationMiddleware)
export class HelloWorldController {
  @Inject()
  private helloWorldService: HelloWorldService;

  @Get('/')
  get() {
    return this.helloWorldService.getHelloWorld();
  }
}
