export const generateTotalPersonOptions = (
  value: number
): {
  value: number;
  label: string;
}[] => {
  if (value <= 0) {
    return [];
  }

  const result = [];

  for (let i = 1; i <= value; i++) {
    const obj = {
      value: i,
      label: i.toString(),
    };
    result.push(obj);
  }

  return result;
};
