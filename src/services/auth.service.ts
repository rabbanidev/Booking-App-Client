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

export const getUserInfo = (accessToken: string) => {
  const authInfo = decodedToken(accessToken) as any;

  return {
    role: authInfo.role,
    userId: authInfo.userId,
  };
};

export const authLoggedIn = (accessToken?: string): boolean => {
  let authToken;

  if (accessToken) {
    authToken = accessToken;
  } else {
    authToken = getFromLocalStorage(authKey);
  }

  return !!authToken;
};

export const removeUserInfo = (): void => {
  removeFromLocalStorage(authKey);
};
