import { styles } from "@/app/styles/styles";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import React, { useEffect, useRef, useState } from "react";
// import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";
import toast from "react-hot-toast";

type RootState = ReturnType<typeof store.getState>;

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

export default function Verification({ setRoute }: Props) {
  const { token } = useSelector((state: RootState) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error && error.data) {
        const errorData = error.data as { error: string };
        toast.error(errorData.error);
        setInvalidError(true);
      } else {
        console.log("an error occurred", error);
        toast.error("An error occurred");
      }
    }
  }, [isSuccess, error, setRoute]);

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const verificationHandler = async () => {
    // console.log("test");
    // setInvalidError(true);
    const VerificationNumber = Object.values(verifyNumber).join("");
    if (VerificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }

    if (!token) {
      toast.error("Activation token is missing");
      return;
    }

    // console.log("Sending activation request with token:", token);

    await activation({
      activation_token: token,
      activation_code: VerificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-primary flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[55px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-poppins outline-none text-center ${
              invalidError
                ? "shake border-red-500"
                : "dark:border-white border-black"
            }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button className={`${styles.button}`} onClick={verificationHandler}>
          verify OTP
        </button>
      </div>
      <br />
      <br />
      <h5 className="text-center pt-4 font-poppins text-[14px] text-black dark:text-white">
        Go back to sign in?{" "}
        <span
          className="text-primary pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Sign In
        </span>
      </h5>
    </div>
  );
}
