import express, { Response } from 'express';
import { getManager } from 'typeorm';
import { Task } from '../entity/Task';
import { UserRole } from '../entity/User';
import { RequestWithUser } from '../types/request.d';
import authenticateToken from '../middlewares/authenticateToken';

const router = express.Router();

router.post('/createEntry', authenticateToken, async (req: RequestWithUser, res: Response) => {
  const { body: taskData, user } = req;
  if (user.id === taskData.byUser || user.role === UserRole.ADMIN) {
    const taskRepository = getManager().getRepository(Task);
    const task = taskRepository.create(taskData);
    await taskRepository.save(task);
    res.json(task);
  } else {
    res.sendStatus(403);
  }
});

router.patch('/editEntry/:id', authenticateToken, async (req: RequestWithUser, res: Response) => {
  const { params: { id }, body: updatedTask, user } = req;
  const taskRepository = getManager().getRepository(Task);
  const task = await taskRepository.findOne(id, { relations: ['byUser'] });
  if (task.byUser.id === user.id || user.role === UserRole.ADMIN) {
    await taskRepository.update(id, updatedTask);
    res.json({ response: 'Updated successfully' });
  } else {
    res.sendStatus(403);
  }
});

router.delete('/deleteEntry/:id', authenticateToken, async (req: RequestWithUser, res: Response) => {
  const { params: { id }, user } = req;
  const taskRepository = getManager().getRepository(Task);
  const task = await taskRepository.findOne(id, { relations: ['byUser'] });
  if (task.byUser.id === user.id || user.role === UserRole.ADMIN) {
    await taskRepository.delete(id);
    res.json({ response: 'Deleted successfully' });
  } else {
    res.sendStatus(403);
  }
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
