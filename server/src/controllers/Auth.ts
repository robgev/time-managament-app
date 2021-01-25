import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRole } from '../entities/User';
import { IUser } from '../utils/types/User.d';
import { BadRequest } from '../utils/errors/BadRequest';

export const comparePasswords = async (password: string, userPassword: string) => {
  const passwordsMatch = await compare(password, userPassword);
  return passwordsMatch;
};

export const issueToken = (sessionInfo: { id: number, role: UserRole }) => {
  const accessToken = jwt.sign(
    sessionInfo,
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_LIFE,
    },
  );
  return accessToken;
};

export const login = async (password: string, user: IUser) => {
  const isCorrectPass = await comparePasswords(password, user.password);
  if (isCorrectPass) {
    const sessionInfo = { id: user.id, role: user.role };
    return issueToken(sessionInfo);
  }
  throw new BadRequest('Passwords do not match');
};
