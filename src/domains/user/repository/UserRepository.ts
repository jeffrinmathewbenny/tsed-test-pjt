import { Injectable } from '@tsed/di';
import { config } from '../../../config/index';
import { User, UserModel } from '../model/UserModel';

const models = require('express-cassandra');
const path = require('path');

const modelPath = path.join(__dirname, '../model');
models.setDirectory(modelPath).bind(
  {
    clientOptions: {
      contactPoints: config.envs.CASSANDRA_CONTACT_POINTS.split(' '),
      localDataCenter: config.envs.CASSANDRA_LOCAL_DATA_CENTER,
      protocolOptions: { port: config.envs.CASSANDRA_PORT },
      keyspace: config.envs.CASSANDRA_KEY_SPACE,
      queryOptions: { consistency: models.consistencies.one },
      socketOptions: { readTimeout: 60000 },
    },
    ormOptions: {
      defaultReplicationStrategy: {
        class: config.envs.CASSANDRA_REPL_STRATEGY,
        replication_factor: config.envs.CASSANDRA_REPL_FACTOR,
      },
      migration: config.envs.CASSANDRA_MIGRATION,
    },
  },
  function (err: Error) {
    if (err) throw err;

    // You'll now have a `person` table in cassandra created against the model
    // schema you've defined earlier and you can now access the model instance
    // in `models.instance.Person` object containing supported orm operations.
  }
);

@Injectable()
export class UserRepository {
  async getUsers(): Promise<User[]> {
    const users: User[] = [];
    const userList = await models.instance.User.findAsync({ bucket: 'TEST_BUCKET' });
    if (userList?.length) {
      userList.forEach((user: UserModel) => {
        users.push({
          name: user.name,
          surName: user.surname,
          age: user.age,
        });
      });
    }
    return users;
  }

  async postUser(userInfo: User): Promise<void> {
    const user = new models.instance.User({
      bucket: 'TEST_BUCKET',
      name: userInfo.name,
      surname: userInfo.surName,
      age: userInfo.age,
      created: { $db_function: 'toTimestamp(now())' },
    });
    await user.save();
  }

  async getUserByName(name: string): Promise<User | null> {
    const user = await models.instance.User.findOneAsync({ bucket: 'TEST_BUCKET', name });
    return user || null;
  }

  async updateUser(name: string, userInfo: Partial<User>) {
    const updatedUser = {
      surname: userInfo?.surName || undefined,
      age: userInfo?.age || undefined,
    };
    await models.instance.User.updateAsync({ bucket: 'TEST_BUCKET', name }, updatedUser);
  }

  async deleteUser(name: string) {
    await models.instance.User.deleteAsync({ bucket: 'TEST_BUCKET', name });
  }
}
