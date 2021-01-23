import { Result, ValidationError } from 'express-validator';
import { ResponseError } from './ResponseError';

export class UnprocessableEntity extends ResponseError {
  constructor(errors?: Result<ValidationError>) {
    const code = 'UnprocessableEntity';

    super(code);
    this.code = code;
    this.status = 422;
    this.errors = errors;
    this.message = 'Server could not process the entity/entities';
  }
}
