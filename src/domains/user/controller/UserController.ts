import { Controller, Inject } from '@tsed/di';
import { Delete, Description, Get, Post, Put, Required, Status, Returns } from '@tsed/schema';
import { ProfileController } from './ProfileController';
import { UserService } from '../service/UserService';
import { BodyParams, PathParams } from '@tsed/platform-params';
import { User } from '../model/UserModel';

@Controller({
  path: '/user',
  children: [ProfileController],
})
export class UserController {
  @Inject()
  private userService: UserService;

  @Get('/')
  @(Returns(200, Array).Of(User).Description('Success')) // prettier-ignore
  @(Returns(404).Description('Not Found')) // prettier-ignore
  @Description('Get the list of users')
  async get(): Promise<User[]> {
    const userData = await this.userService.getUser();
    return userData;
  }

  @Post('/')
  @Status(201)
  async post(@BodyParams() @Required() requestParams: User): Promise<void> {
    await this.userService.postUser(requestParams);
  }

  @Get('/:name')
  @(Returns(200, User).Description('Success')) // prettier-ignore
  async getUserByName(@Required() @PathParams('name') name: string): Promise<User | null> {
    return await this.userService.getUserByName(name);
  }

  @Put('/:name')
  @(Returns(201).Description('Success')) // prettier-ignore
  @(Returns(404).Description('Not Found')) // prettier-ignore
  async update(@Required() @PathParams('name') name: string, @Required() @BodyParams() updateUser: Partial<User>): Promise<void> {
    await this.userService.updateUser(name, updateUser);
  }

  @Delete('/:name')
  @Status(200)
  async delete(@Required() @PathParams('name') name: string): Promise<void> {
    await this.userService.deleteUser(name);
  }
}
