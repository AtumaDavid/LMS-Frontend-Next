// // "use client";
// // import { configureStore } from "@reduxjs/toolkit";
// // import { apiSlice } from "./features/api/apiSlice";
// // import authSlice from "./features/auth/authSlice";

// // export type RootState = ReturnType<typeof store.getState>;

// // export const store = configureStore({
// //   reducer: {
// //     [apiSlice.reducerPath]: apiSlice.reducer,
// //     auth: authSlice,
// //   },
// //   devTools: false,
// //   middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware().concat(apiSlice.middleware),
// // });

// // // call refresh token function on every page load

// // const initializieApp = async () => {
// //   // await store.dispatch(
// //   //   apiSlice.endpoints.RefreshToken.initiate({}, { forceRefetch: true })
// //   // );
// //   const state = store.getState();
// //   if (!state.auth.token || !state.auth.user) {
// //     await store.dispatch(
// //       apiSlice.endpoints.RefreshToken.initiate({}, { forceRefetch: true })
// //     );
// //   }

// //   await store.dispatch(
// //     apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
// //   );
// // };

// // initializieApp();

// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./features/api/apiSlice";
// import authSlice from "./features/auth/authSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"],
// };

// const persistedReducer = persistReducer(persistConfig, authSlice);

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: persistedReducer,
//   },
//   devTools: false,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST"],
//       },
//     }).concat(apiSlice.middleware),
// });

// export const persistor = persistStore(store);

// const initializeApp = async () => {
//   const state = store.getState();
//   if (!state.auth.token) {
//     await store.dispatch(
//       apiSlice.endpoints.RefreshToken.initiate({}, { forceRefetch: true })
//     );
//     await store.dispatch(
//       apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
//     );
//   }
// };

// initializeApp();

// export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist config for the auth slice
const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: authSlice,
//   },
//   devTools: false,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedAuthReducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

// const initializeApp = async () => {
//   const storedToken = localStorage.getItem("accessToken");

//   if (!storedToken) {
//     await store.dispatch(
//       apiSlice.endpoints.RefreshToken.initiate({}, { forceRefetch: true })
//     );
//   } else {
//     await store.dispatch(
//       apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
//     );
//   }
// }
// ;


// Initialize app (runs on client-side load)
const initializeApp = async () => {
  const state = store.getState();
  if (!state.auth.token) {
    await store.dispatch(
      apiSlice.endpoints.RefreshToken.initiate({}, { forceRefetch: true })
    );
  }
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
