import { getManager } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';
import { IUser } from '../utils/types/User';
import { BadRequest } from '../utils/errors/BadRequest';

export const create = async (
  {
    username,
    password,
    firstName,
    lastName,
  }:
  Record<string, string>,
) => {
  // TODO: Handle the case when the username already exists
  const UserRepo = getManager().getRepository(User);
  // 10 is the number of rounds for salt;
  const passwordHash = await bcrypt.hash(password, 10);
  // Get the TypeORM user repo and create a new User obj
  const user = UserRepo.create({
    username,
    password: passwordHash,
    firstName,
    lastName,
  });
  await UserRepo.save(user);
  return user;
};

export const edit = async (id: number, userData: Partial<IUser>) => {
  // TODO: Handle invalid ids
  const UserRepo = getManager().getRepository(User);
  await UserRepo.update(id, userData);
};

export const remove = async (id: number) => {
  // TODO: Handle invalid ids
  const UserRepo = getManager().getRepository(User);
  await UserRepo.delete(id);
};

export const getAll = async () => {
  const UserRepo = getManager().getRepository(User);
  const allUsers = await UserRepo.find();
  return allUsers;
};

export const getUserByUsername = async (username: string) => {
  // TODO: Handle invalid username
  const UserRepo = getManager().getRepository(User);
  const user = await UserRepo.findOne(
    { username },
    { select: ['username', 'password', 'id', 'role'] },
  );
  if (!user) {
    throw new BadRequest('Invalid username');
  }
  return user;
};

export const getUser = async (id: number) => {
  const UserRepo = getManager().getRepository(User);
  const user = await UserRepo.findOne(
    { id },
    {
      select: [
        'username',
        'id',
        'role',
        'firstName',
        'lastName',
        'preferredWorkingHoursPerDay',
      ],
    },
  );
  if (!user) {
    throw new BadRequest('Invalid username');
  }
  return user;
};
