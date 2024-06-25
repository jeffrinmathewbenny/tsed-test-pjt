import { Injectable } from '@tsed/di';
const models = require('express-cassandra');
import { config } from '../../config/index';

models.setDirectory(__dirname).bind(
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
  async getUsers() {
    return await models.instance.User.findAsync({ bucket: 'TEST_BUCKET' });
  }

  async postUser(requestParams) {
    const user = new models.instance.User({
      bucket: 'TEST_BUCKET',
      name: requestParams.name,
      surname: requestParams.surName,
      age: requestParams.age,
      created: { $db_function: 'toTimestamp(now())' },
    });
    await user.save();
  }
}
