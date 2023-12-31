import { format, parseISO } from 'date-fns';

export const parserTime = (timeString) => {
  const dateTime = parseISO(timeString);

  return format(dateTime, 'HH:mm:ss dd/MM/yyyy');
}