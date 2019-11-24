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
