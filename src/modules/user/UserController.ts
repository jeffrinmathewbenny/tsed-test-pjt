import { Controller, Inject } from '@tsed/di';
import { Delete, Get, Post, Put, Required, Status } from '@tsed/schema';
import { ProfileController } from './profile/ProfileController';
import { UserService } from './UserService';
import { BodyParams, PathParams } from '@tsed/platform-params';
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

  @Get('/:name')
  @Status(200)
  async getUserByName(@Required() @PathParams('name') name: string) {
    return await this.userService.getUserByName(name);
  }

  @Put('/:name')
  @Status(200)
  async update(@Required() @PathParams('name') name: string, @Required() @BodyParams() updateUser: Partial<UserModel>) {
    await this.userService.updateUser(name, updateUser);
  }

  @Delete('/:name')
  @Status(200)
  async delete(@Required() @PathParams('name') name: string) {
    await this.userService.deleteUser(name);
  }
}
