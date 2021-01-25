import { ResponseError } from './ResponseError';

export class Forbidden extends ResponseError {
  constructor() {
    const code = 'Forbidden';

    super(code);
    this.code = code;
    this.status = 403;
    this.message = 'You are forbidden to make this request. Check your permissions';
  }
}
