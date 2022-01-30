export class CreateUserDto {
  id?: string;

  name: string;

  login: string;

  password: string;

  constructor(value: {
    id?: string,
    name: string,
    login: string,
    password: string,
  }) {
    this.id = value.id;
    this.name = value.name;
    this.login = value.login;
    this.password = value.password;
  }
}
