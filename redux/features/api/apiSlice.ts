import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    RefreshToken: builder.query({
      query: () => ({
        url: "refreshtoken",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result.data?.accessToken) {
            dispatch(
              userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
          }
        } catch (error) {
          console.log("RefreshToken error:", error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "userinfo",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result.data?.user) {
            dispatch(
              userLoggedIn({
                accessToken: result.data.accessToken || "", // Fallback if no token
                user: result.data.user,
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedIn } from "../auth/authSlice";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     RefreshToken: builder.query({
//       query: () => ({
//         url: "refreshtoken",
//         method: "GET",
//         credentials: "include" as const,
//       }),
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {
//           const result = await queryFulfilled;
//           if (result.data?.accessToken) {
//             dispatch(
//               userLoggedIn({
//                 accessToken: result.data.accessToken,
//                 user: result.data.user,
//               })
//             );
//             localStorage.setItem("accessToken", result.data.accessToken);
//             if (result.data.user) {
//               localStorage.setItem("user", JSON.stringify(result.data.user));
//             }
//           }
//         } catch (error) {
//           console.log("RefreshToken error:", error);
//           // Optionally clear tokens on refresh failure
//           localStorage.removeItem("accessToken");
//           localStorage.removeItem("user");
//           // dispatch(userLoggedOut());
//         }
//       },
//     }),
//     loadUser: builder.query({
//       query: () => ({
//         url: "userinfo",
//         method: "GET",
//         credentials: "include" as const,
//       }),
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {
//           const result = await queryFulfilled;
//           if (result.data?.accessToken || result.data?.user) {
//             dispatch(
//               userLoggedIn({
//                 accessToken:
//                   result.data.accessToken ||
//                   localStorage.getItem("accessToken"),
//                 user: result.data.user,
//               })
//             );
//             if (result.data.accessToken) {
//               localStorage.setItem("accessToken", result.data.accessToken);
//             }
//             if (result.data.user) {
//               localStorage.setItem("user", JSON.stringify(result.data.user));
//             }
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//   }),
// });

// export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
