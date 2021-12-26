import { StatusCodes } from 'http-status-codes';

export class ValidationError extends Error {
  status = StatusCodes.BAD_REQUEST;

  text!: { [k: string]: unknown }[];

  constructor(msg: { [k: string]: unknown }[]) {
    super();
    if (msg) {
      this.text = msg;
    }
  }
}
