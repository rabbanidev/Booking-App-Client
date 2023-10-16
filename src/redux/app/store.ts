import baseAPi from "../features/baseApi/baseApi";
import { reducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
