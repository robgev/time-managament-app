// TODO: Create and handle refreshTokens
// TODO: Use controllers to keep the routes clean

import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getManager } from 'typeorm';

import { User } from '../entities/User';
import * as UserController from '../controllers/User';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  // Authenticate the user
  const { username, password } = req.body;
  const userRepository = getManager().getRepository(User);
  const user = await userRepository.findOne({ username });
  if (!user) {
    res.status(400).send({ response: 'Invalid username' });
  } else {
    try {
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        // Logged in successfully, need to issue a token
        const sessionInfo = { id: user.id, username, role: user.role };
        const accessToken = jwt.sign(
          sessionInfo,
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_ACCESS_TOKEN_LIFE,
          },
        );

        res.json({ response: 'Logged in successfully', accessToken });
      } else {
        res.status(400).send({ response: 'Invalid password' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ response: 'Something went wrong when trying to log in', err });
    }
  }
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = UserController.create({ username, password });
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ response: 'Something went wrong when trying to sign up' });
  }
});

export default router;
