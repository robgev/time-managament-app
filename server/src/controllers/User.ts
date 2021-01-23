import { getManager } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';
import { IUser } from '../types/User.d';

export const create = async (
  { username, password }: { username: string, password: string },
) => {
  const UserRepo = getManager().getRepository(User);
  // 10 is the number of rounds for salt;
  const passwordHash = await bcrypt.hash(password, 10);
  // Get the TypeORM user repo and create a new User obj
  const user = UserRepo.create({ username, password: passwordHash });
  await UserRepo.save(user);
  return user;
};

export const edit = async (id: number, userData: Partial<IUser>) => {
  const UserRepo = getManager().getRepository(User);
  await UserRepo.update(id, userData);
};

export const remove = async (id: number) => {
  const UserRepo = getManager().getRepository(User);
  await UserRepo.delete(id);
};

export const getAll = async () => {
  const UserRepo = getManager().getRepository(User);
  const allUsers = await UserRepo.find();
  return allUsers;
};
