export const numToArray = (num: number): number[] => {
  let numArray: number[] = [];
  for (let i = 1; i <= num; i++) {
    numArray.push(i);
  }

  return numArray;
};
