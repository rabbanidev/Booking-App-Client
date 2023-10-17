import { authKey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  setToLocalStorage(authKey, accessToken as string);
};

export const getUserInfo = (): unknown | null => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const authInfo = decodedToken(authToken);
    return authInfo;
  } else {
    return null;
  }
};

export const isLoggedIn = (): boolean => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (): void => {
  removeFromLocalStorage(authKey);
};
