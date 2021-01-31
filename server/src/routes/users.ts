import express, { Request, Response } from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import { canManageUser } from '../middlewares/isAuthorized';
import * as UserController from '../controllers/User';

const router = express.Router();

router.get('/', authenticateToken, canManageUser, async (req: Request, res: Response) => {
  const { skip = 0, take = 20 } = req.query;
  const parsedSkip = parseInt(skip.toString(), 10);
  const parsedTake = parseInt(take.toString(), 10);
  const allUsers = await UserController.getAll(parsedSkip, parsedTake);
  res.json(allUsers);
});

router.post('/create', authenticateToken, canManageUser, async (req: Request, res: Response) => {
  const { body: credentials } = req;
  const userData = await UserController.create(credentials);
  res.status(201).json(userData);
});

router.patch('/edit/:id', authenticateToken, canManageUser, async (req: Request, res: Response) => {
  const { params, body: userData } = req;
  const id = parseInt(params.id, 10);
  await UserController.edit(id, userData);
  res.json({ response: 'User updated' });
});

router.delete('/delete/:id', authenticateToken, canManageUser, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await UserController.remove(id);
  res.json({ response: 'Deleted successfully' });
});

router.patch('/setHours/:id', authenticateToken, canManageUser, async (req: Request, res: Response) => {
  const { hours } = req.body;

  await UserController.edit(res.locals.user.id, { preferredWorkingHoursPerDay: hours });
  res.send({ response: 'Set successfully' });
});

export default router;
