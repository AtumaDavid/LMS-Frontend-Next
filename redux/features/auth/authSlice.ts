// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   token: "",
//   user: "",
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     userRegistration: (state, action) => {
//       state.token = action.payload.token;
//       // state.user = action.payload.user;
//     },
//     userLoggedIn: (state, action) => {
//       state.token = action.payload.accessToken;
//       // state.user = action.payload.user;
//       state.user = JSON.stringify(action.payload.user);
//     },
//     userLoggedOut: (state) => {
//       state.token = "";
//       state.user = "";
//     },
//   },
// });

// export const { userRegistration, userLoggedIn, userLoggedOut } =
//   authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("accessToken") || "", // This is fine since token is a string
  user: (() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("accessToken", action.payload.token);
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
