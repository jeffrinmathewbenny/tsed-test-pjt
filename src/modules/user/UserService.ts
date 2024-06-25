import { Injectable, Inject } from '@tsed/di';
import { UserRepository } from './UserRepository';
import { NotFound } from '@tsed/exceptions';

@Injectable()
export class UserService {
  @Inject()
  private userRepository: UserRepository;

  async getUser() {
    try {
      const users = await this.userRepository.getUsers();
      return users;
    } catch (error) {
      throw new NotFound('User List Not Found');
    }
  }

  async postUser(requestParams) {
    await this.userRepository.postUser(requestParams);
  }

  async getUserByName(name) {
    return await this.userRepository.getUserByName(name);
  }

  async updateUser(name, userInfo) {
    await this.userRepository.updateUser(name, userInfo);
  }

  async deleteUser(name) {
    await this.userRepository.deleteUser(name);
  }
}
