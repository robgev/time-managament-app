import { formatISO9075 } from 'date-fns';

interface IQuery {
  from?: string,
  to?: string,
  skip?: number,
  take?: number
}

export default (query: IQuery) => {
  const {
    from: rawFrom = '',
    to: rawTo = '',
    skip: rawSkip = 0,
    take: rawTake = 20,
  } = query;
  const parsedFrom = rawFrom ? new Date(rawFrom.toString()) : new Date(0);
  const parsedTo = rawTo ? new Date(rawTo.toString()) : new Date();
  const from = formatISO9075(parsedFrom);
  const to = formatISO9075(parsedTo);
  const skip = parseInt(rawSkip.toString(), 10);
  const take = parseInt(rawTake.toString(), 10);

  return {
    from,
    to,
    skip,
    take,
  };
};
