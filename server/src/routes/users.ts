import express, { Request, Response } from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import { UserRole } from '../entities/User';
import * as UserController from '../controllers/User';

const router = express.Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  if (res.locals.user.role > UserRole.USER) {
    const allUsers = await UserController.getAll();
    res.json(allUsers);
  } else {
    res.sendStatus(403);
  }
});

router.post('/create', authenticateToken, async (req: Request, res: Response) => {
  const { body: credentials } = req;
  const { user } = res.locals;
  if (user.role > UserRole.USER) {
    const userData = await UserController.create(credentials);
    res.send(201).json(userData);
  } else {
    res.sendStatus(403);
  }
});

router.patch('/edit/:id', authenticateToken, async (req: Request, res: Response) => {
  const { params, body: userData } = req;
  const id = parseInt(params.id, 10);
  const { user } = res.locals;
  if (user.role > UserRole.USER) {
    await UserController.edit(id, userData);
    res.json({ response: 'User updated' });
  } else {
    res.sendStatus(403);
  }
});

router.delete('/delete/:id', authenticateToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { user } = res.locals;
  if (user.role > UserRole.USER) {
    await UserController.remove(id);
    res.json({ response: 'Deleted successfully' });
  } else {
    res.sendStatus(403);
  }
});

router.patch('/setHours', authenticateToken, async (req: Request, res: Response) => {
  const { hours } = req.body;

  await UserController.edit(res.locals.user.id, { preferredWorkingHoursPerDay: hours });
  res.send({ response: 'Set successfully' });
});

export default router;
