import { v4 } from 'uuid';
import { UserParams } from '../../models/interfaces';

export class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  }: UserParams) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User): { id: string; name: string; login: string } {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
