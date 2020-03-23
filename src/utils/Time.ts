export const SplitDatetimeStr = (datetime: string): string[] => {
  return datetime.split(' ', 2);
};

export const ParseDate = (datetime: string): string => {
  return SplitDatetimeStr(datetime)[0];
};

export const FormatDatetime = (datetime: string): string => {
  const splitDatetime = datetime.split('T');

  return splitDatetime[0] + ' ' + splitDatetime[1] + ':00';
};

export const Now = (): Date => new Date();

export const FillZero = (n: number): string => {
  return (n < 10) ? `0${n}` : `${n}`;
};

export const DateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = FillZero(date.getMonth() + 1);
  const day = FillZero(date.getDate());
  const hour = FillZero(date.getHours());
  const minutes = FillZero(date.getMinutes());
  const seconds = FillZero(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
};

export const ReplaceSpaceToT = (datetime: string): string => {
  return datetime.replace(' ', 'T');
};
