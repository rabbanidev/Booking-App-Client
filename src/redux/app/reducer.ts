import authReducer from "../features/auth/authSlice";
import baseAPi from "../features/baseApi/baseApi";

export const reducer = {
  [baseAPi.reducerPath]: baseAPi.reducer,
  auth: authReducer,
};
