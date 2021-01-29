// TODO: Create and handle refreshTokens

import express, { Request, Response } from 'express';

import * as UserController from '../controllers/User';
import * as AuthController from '../controllers/Auth';
import authenticateToken from '../middlewares/authenticateToken';
import { Unauthorized } from '../utils/errors/Unathorized';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await UserController.getUserByUsername(username);
  const accessToken = await AuthController.login(password, user);
  res.json({ response: 'Logged in successfully', accessToken });
});

router.post('/register', async (req: Request, res: Response) => {
  const {
    username,
    password,
    firstName,
    lastName,
  } = req.body;
  const user = await UserController.create({
    username, password, firstName, lastName,
  });
  res.status(201).send(user);
});

router.get('/user', authenticateToken, async (req: Request, res: Response) => {
  const { user } = res.locals;
  if (!user) {
    throw new Unauthorized();
  }
  const response = await UserController.getUser(res.locals.user.id);
  res.json(response);
});

export default router;
