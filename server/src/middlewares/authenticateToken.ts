import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export default (req: Request, res: Response, next: Function) => {
  const authHeader = req.get('authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <access_token>
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          res.sendStatus(403);
        } else {
          res.locals.user = user;
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
