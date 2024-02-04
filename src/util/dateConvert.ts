import { differenceInDays, format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const converDate = (val: Date | number) => {
  const newDate = format(val, 'yyyy.MM.dd HH:mm', { locale: ko });
  return newDate;
};

export const convertDBDate = (val: Date | number) => {
  const newDate = format(val, 'yyyy-MM-dd HH:mm:ss', { locale: ko });
  return newDate;
};

export const checkDayDate = (val: Date | number) => {
  const checkDay = differenceInDays(new Date(), val) > 7;
  if (checkDay) {
    return format(val, 'yy.MM.dd', { locale: ko });
  } else {
    return `${formatDistanceToNow(val, { locale: ko })}전`;
  }
};
