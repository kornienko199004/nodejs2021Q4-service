import { StatusCodes } from 'http-status-codes';

export class AuthError extends Error {
  status = StatusCodes.UNAUTHORIZED;

  constructor(msg = 'Invalid login or password') {
    super(msg);
  }
}
