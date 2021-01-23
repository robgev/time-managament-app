// TODO: Create and handle refreshTokens

import express, { Request, Response } from 'express';

import * as UserController from '../controllers/User';
import * as AuthController from '../controllers/Auth';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await UserController.getUserByUsername(username);
  const accessToken = AuthController.login(password, user);
  res.json({ response: 'Logged in successfully', accessToken });
});

router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = UserController.create({ username, password });
  res.status(201).send(user);
});

export default router;
