import { Request, Response, NextFunction } from 'express';
import { SyntheticError } from '../utils/types/SyntheticError';

// We need to specify the next for express middleware
// It will come last anyways but still
export default (err: SyntheticError, req: Request, res: Response, next: NextFunction) => {
  if (err.message) {
    const { message, errors, code } = err;
    res
      .status(err.status)
      .json({
        code,
        message,
        errors,
      });
  } else {
    // All non-synthetic errors
    console.error(err); // For debugging purposes
    res.status(500).json({
      code: 'Unknown',
      message: 'Something went wrong...',
      error: err,
    });
  }
  next();
};
