import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  accessToken: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.accessToken = action.payload;
    },
    loggedOut: (state) => {
      state.accessToken = undefined;
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;

export default authSlice.reducer;
