import { ITask } from './Task.d';
import { UserRole } from '../entities/User';

export interface IUser {
    id: number;
    firstName?: string;
    lastName?: string;
    username: string;
    password: string;
    preferredWorkingHoursPerDay?: number;
    role: UserRole;
    tasks?: ITask[];
}
