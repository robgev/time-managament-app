import { formatISO9075 } from 'date-fns';

export const formatKey = (date: string = '') =>
  formatISO9075(new Date(date), { representation: 'date' })

export const isSameDate = (dateA: string = '', dateB: string = '') =>
  formatKey(dateA) === formatKey(dateB);
