import express, { Request, Response } from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import { isUserManager } from '../middlewares/isAuthorized';
import * as UserController from '../controllers/User';

const router = express.Router();

router.get('/', authenticateToken, isUserManager, async (req: Request, res: Response) => {
  const allUsers = await UserController.getAll();
  res.json(allUsers);
});

router.post('/create', authenticateToken, isUserManager, async (req: Request, res: Response) => {
  const { body: credentials } = req;
  const userData = await UserController.create(credentials);
  res.send(201).json(userData);
});

router.patch('/edit/:id', authenticateToken, isUserManager, async (req: Request, res: Response) => {
  const { params, body: userData } = req;
  const id = parseInt(params.id, 10);
  await UserController.edit(id, userData);
  res.json({ response: 'User updated' });
});

router.delete('/delete/:id', authenticateToken, isUserManager, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await UserController.remove(id);
  res.json({ response: 'Deleted successfully' });
});

router.patch('/setHours', authenticateToken, isUserManager, async (req: Request, res: Response) => {
  const { hours } = req.body;

  await UserController.edit(res.locals.user.id, { preferredWorkingHoursPerDay: hours });
  res.send({ response: 'Set successfully' });
});

export default router;
