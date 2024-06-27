import { Controller } from '@tsed/di';
import { Get } from '@tsed/schema';

@Controller('/profile')
export class ProfileController {
  @Get('/')
  get() {
    return 'hello from profile';
  }
}
