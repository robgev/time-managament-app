import { IUser } from './User.d';

export interface ITask {
  id: number,
  createdAt: Date,
  workedOn: string,
  workedWhen: Date,
  duration: number,
  byUser: IUser,
  byUserId: number
}
