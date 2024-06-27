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

export interface UserModel {
  name: string;
  surName: string;
  age: number;
}

export default UserDbModel;
