import { Request, Response, NextFunction } from 'express';
import { getTaskById } from '../controllers/Task';
import { Unauthorized } from '../utils/errors/Unathorized';
import { Forbidden } from '../utils/errors/Forbidden';
import { UserRole } from '../entities/User';

export const canCreateTask = (req: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals;
  if (!res.locals.user) {
    throw new Unauthorized();
  }
  const { body: taskData } = req;
  if (user.id !== taskData.byUser && user.role !== UserRole.ADMIN) {
    throw new Forbidden();
  }
  next();
};

export const canEditTask = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const { user } = res.locals;
  if (!res.locals.user) {
    throw new Unauthorized();
  }
  const task = await getTaskById(id);
  if (task.byUserId !== user.id && user.role !== UserRole.ADMIN) {
    throw new Forbidden();
  }
  next();
};

export const isUserManager = (req: Request, res: Response, next: NextFunction) => {
  // We have 3 roles. All except the normal
  // user are user managers
  if (res.locals.user.role === UserRole.USER) {
    throw new Forbidden();
  }
  next();
};
