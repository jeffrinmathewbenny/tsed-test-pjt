import { Injectable, Inject } from '@tsed/di';
import { UserRepository } from '../repository/UserRepository';
import { NotFound } from '@tsed/exceptions';
import { User } from '../model/UserModel';

@Injectable()
export class UserService {
  @Inject()
  private userRepository: UserRepository;

  async getUser(): Promise<User[]> {
    try {
      const users = await this.userRepository.getUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async postUser(user: User) {
    await this.userRepository.postUser(user);
  }

  async getUserByName(name: string): Promise<User | null> {
    return await this.userRepository.getUserByName(name);
  }

  async updateUser(name: string, userInfo: Partial<User>) {
    const user = await this.getUserByName(name);
    if (!user) {
      throw new NotFound('User Not Found');
    }
    await this.userRepository.updateUser(name, userInfo);
  }

  async deleteUser(name: string) {
    await this.userRepository.deleteUser(name);
  }
}
