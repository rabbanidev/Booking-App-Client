import { useEffect, useState } from "react";
import { getFromLocalStorage } from "../utils/localStorage";
import { useDispatch } from "react-redux";

const useGetLocalStorage = (key: string, fn: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localData = getFromLocalStorage(key);
    if (localData) {
      dispatch(fn(localData));
    }
    setLoading(true);
  }, [dispatch, fn, key]);

  return { loading };
};

export default useGetLocalStorage;
