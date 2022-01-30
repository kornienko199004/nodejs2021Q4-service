export class LoginDto {
  login: string;

  password: string;

  constructor(value: {
    login: string;
    password: string;
  }) {
    this.login = value.login;
    this.password = value.password;
  }
}