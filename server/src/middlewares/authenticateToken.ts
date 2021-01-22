import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { RequestWithUser } from '../types/request.d';

export default (req: RequestWithUser, res: Response, next: Function) => {
  const authHeader = req.get('authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <access_token>
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          res.sendStatus(403);
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};
