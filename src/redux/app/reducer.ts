import baseAPi from "../features/baseApi/baseApi";
import authReducer from "../features/auth/authSlice";

export const reducer = {
  [baseAPi.reducerPath]: baseAPi.reducer,
  auth: authReducer,
};
