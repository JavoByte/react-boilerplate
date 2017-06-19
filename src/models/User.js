import Model from './Model';

class User extends Model {
  static attributes = [
    'id',
    'first_name',
    'last_name',
    'email',
  ];
}

export default User;
