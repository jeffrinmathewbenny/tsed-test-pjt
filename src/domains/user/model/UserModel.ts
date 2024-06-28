import { Integer, Property, Required } from '@tsed/schema';

const UserDbModel = {
  fields: {
    bucket: 'text',
    name: 'text',
    surname: 'text',
    age: 'int',
    created: 'timestamp',
  },
  key: ['bucket', 'name'],
};

export class UserModel {
  bucket: string;
  name: string;
  surname: string;
  age: number;
  created: Date;
}

export class User {
  @Required()
  name: string;

  @Property()
  surName: string;

  @Property()
  @Integer()
  age: number;
}

export default UserDbModel;
