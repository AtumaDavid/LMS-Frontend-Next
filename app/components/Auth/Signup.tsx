"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "@/app/styles/styles";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type Props = {
  setRoute?: (route: string) => void;
};

const schema = Yup.object({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter a valid email address"),
  password: Yup.string().required("Please enter a valid password").min(6),
});

export default function Signup({ setRoute }: Props) {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute?.("Verification");
    }
    if (error) {
      // Improved error extraction logic to get precise messages
      if ("data" in error) {
        const errorData = error as FetchBaseQueryError;
        let errorMessage = "Registration failed. Please try again.";

        // Extract the exact error message from the server response
        if (errorData.data) {
          if (typeof errorData.data === "object") {
            if ("message" in errorData.data) {
              errorMessage = (errorData.data as { message: string }).message;
            } else if ("error" in errorData.data) {
              errorMessage = (errorData.data as { error: string }).error;
            }
          } else if (typeof errorData.data === "string") {
            errorMessage = errorData.data;
          }
        }

        // Display specific error message, like "Email already exists"
        toast.error(errorMessage);
      } else {
        // Handle serialized errors
        const serializedError = error as SerializedError;
        const errorMessage =
          serializedError.message || "An unexpected error occurred";
        toast.error(errorMessage);
      }
    }
  }, [isSuccess, error, data, setRoute]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = { name, email, password };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Signup with E-Learn</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className={`${styles.label}`} htmlFor="name">
            Enter Your Name
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="John Doe"
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>
        <div>
          <label className={`${styles.label}`} htmlFor="email">
            Enter Your Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Enter Your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}

        {/* submit */}
        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-poppins text-[14px] text-black dark:text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle className="cursor-pointer mr-2" size={30} />
          <AiFillGithub className="cursor-pointer ml-2" size={30} />
        </div>

        <h5 className="text-center pt-4 font-poppins text-[14px]">
          Already have an account?
          <span
            className="text-primary pl-1 cursor-pointer"
            onClick={() => setRoute && setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
}
