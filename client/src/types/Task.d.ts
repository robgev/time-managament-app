export interface ITask {
  id: number;
  createdAt: Date;
  workedOn: string;
  workedWhen: string;
  duration: number,
  byUser: number,
}
