import { useEffect, useState } from "react";

interface IDebounced {
  searchQuery: string | number;
  delay: number;
}

const useDebounced = ({ searchQuery, delay }: IDebounced) => {
  const [debouncedValue, setDebouncedValue] = useState<string | number>(
    searchQuery
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [delay, searchQuery]);

  return debouncedValue;
};

export default useDebounced;
