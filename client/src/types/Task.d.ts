export interface ITask {
  id: number;
  createdAt: Date;
  workedOn: string;
  workedWhen: Date;
  duration: number,
  byUser: number,
}
