type comparer<T> = (a: T, b: T) => number;

export const dateComparer: comparer<Date> = (a, b) => {
  const aDate = new Date(a);
  const bDate = new Date(b);
  return aDate.getTime() - bDate.getTime();
};

export const stringComparer: comparer<string> = (a, b) => {
  return a.localeCompare(b);
};

export const numberComparer: comparer<number> = (a, b) => {
  return a - b;
};