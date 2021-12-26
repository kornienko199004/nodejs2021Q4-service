import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class ValidationError extends Error {
  status = StatusCodes.BAD_REQUEST;

  text = getReasonPhrase(this.status);

  constructor(msg?: string) {
    super();
    if (msg) {
      this.text = msg;
    }
  }
}
