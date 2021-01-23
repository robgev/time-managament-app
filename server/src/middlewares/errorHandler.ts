import { Request, Response } from 'express';
import { SyntheticError } from '../utils/types/SyntheticError';

// Wont use next, error handler will come the last
export default (err: SyntheticError, req: Request, res: Response) => {
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
};
