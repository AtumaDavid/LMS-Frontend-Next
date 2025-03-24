import { createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  email?: string;
  avatar?: string;
}

interface AuthState {
  token: string;
  user: User | null; 
  socialAuthCompleted: boolean;
}

const initialState: AuthState = {
  token: "",
  user: null,
  socialAuthCompleted: false,
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
      state.user = null;
      state.socialAuthCompleted = false; // Reset on logout
    },
    setSocialAuthCompleted: (state, action) => {
      state.socialAuthCompleted = action.payload;
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut, setSocialAuthCompleted } = authSlice.actions;
export default authSlice.reducer;