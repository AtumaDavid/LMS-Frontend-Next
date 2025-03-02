import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "/registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ actiivation_token, activation_code }) => ({
        url: "/activate-user",
        method: "POST",
        body: { actiivation_token, activation_code },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;
