export const SplitDatetimeStr = (datetime: string): string[] => {
  return datetime.split(' ', 2);
};

export const ParseDate = (datetime: string): string => {
  return SplitDatetimeStr(datetime)[0];
};
