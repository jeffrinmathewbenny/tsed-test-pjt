import { Controller, Inject } from '@tsed/di';
import { Get, Post, Required, Status } from '@tsed/schema';
import { ProfileController } from './profile/ProfileController';
import { UserService } from './UserService';
import { BodyParams } from '@tsed/platform-params';
import { UserModel } from './UserModel';

@Controller({
  path: '/user',
  children: [ProfileController],
})
export class UserController {
  @Inject()
  private userService: UserService;

  @Get('/')
  @Status(200)
  async get() {
    return await this.userService.getUser();
  }

  @Post('/')
  @Status(201)
  async post(@BodyParams() @Required() requestParams: UserModel) {
    await this.userService.postUser(requestParams);
  }
}
