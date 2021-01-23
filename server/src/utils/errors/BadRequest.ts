import { ResponseError } from './ResponseError';

export class BadRequest extends ResponseError {
  constructor(message: string) {
    const code = 'BadRequest';

    super(code);
    this.code = code;
    this.status = 400;
    this.message = message || 'Some fields in the request are incorrect, please check again';
  }
}
