import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Unauthorized } from '../utils/errors/Unathorized';

export default (req: Request, res: Response, next: Function) => {
  const authHeader = req.get('authorization');
  if (!authHeader) {
    throw new Unauthorized();
  }
  const token = authHeader.split(' ')[1]; // Bearer <access_token>
  if (!token) {
    throw new Unauthorized();
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new Unauthorized();
    }
    res.locals.user = user;
    next();
  });
};
