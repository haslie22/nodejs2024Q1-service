export const getTimestamp = (): string => {
  const now = new Date();

  const date = `${now.getFullYear()}-${padZero(now.getMonth() + 1)}-${padZero(now.getDate())}`;
  const time = `${padZero(now.getHours())}-${padZero(now.getMinutes())}-${padZero(now.getSeconds())}`;

  return `${date} ${time}`;
};

const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};
