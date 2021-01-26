export enum UserRole {
  ADMIN = 2,
  MANAGER = 1,
  USER = 0,
}


export interface IUser {
  id: number;
  firstName?: string;
  lastName?: string;
  username: string;
  preferredWorkingHoursPerDay: number | nullstring;
  role: UserRole;
}
