import { ResponseError } from './ResponseError';

export class Unauthorized extends ResponseError {
  constructor() {
    const code = 'Unauthorized';

    super(code);
    this.code = code;
    this.status = 401;
    this.message = 'You are not authorized for this request. Check your roles and/or Log In';
  }
}
