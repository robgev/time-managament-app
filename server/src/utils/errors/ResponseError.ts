import { Result, ValidationError } from 'express-validator';

export class ResponseError extends Error {
  public message: string;

  public code: string;

  public status: number;

  public errors?: Result<ValidationError>;
}
