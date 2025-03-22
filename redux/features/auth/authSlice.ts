import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
  socialAuthCompleted: false, // New flag
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
      state.socialAuthCompleted = false; // Reset on logout
    },
    setSocialAuthCompleted: (state, action) => {
      state.socialAuthCompleted = action.payload;
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut, setSocialAuthCompleted } = authSlice.actions;
export default authSlice.reducer;