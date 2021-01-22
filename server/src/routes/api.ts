import express, { Response } from 'express';
import { getManager, Between } from 'typeorm';
import { Task } from '../entity/Task';
import { RequestWithUser } from '../types/request.d';
import authenticateToken from '../middlewares/authenticateToken';

const router = express.Router();

router.post('/createEntry', authenticateToken, async (req: RequestWithUser, res: Response) => {
  const taskRepository = getManager().getRepository(Task);
  const task = taskRepository.create(req.body);
  await taskRepository.save(task);
  res.json(task);
});

router.get('/entries', authenticateToken, async (req: RequestWithUser, res: Response) => {
  const taskRepository = getManager().getRepository(Task);
  const tasks = await taskRepository.find({
    relations: ['byUser'],
    where: {
      byUser: { id: req.user.id },
      // workedWhen: Between('2020-01-19T07:20:38.303Z', '2021-01-21T07:20:38.303Z'),
    },
  });
  res.json(tasks);
});

export default router;
