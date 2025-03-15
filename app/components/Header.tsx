"use client";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
// import Image from "next/image";

interface User {
  token: string;
  name: string;
}

interface AuthState {
  token: string;
  user: string; // JSON string of user data
}

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

export default function Header({
  open,
  setOpen,
  activeItem,
  route,
  setRoute,
}: Props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [active, setActive] = useState(false);
  // const user = useSelector((state: RootState) => state.auth.user);
  const auth = useSelector((state: RootState) => state.auth) as AuthState;
  // console.log("auth.user type:", typeof auth.user);
  // console.log("auth.user value:", auth.user);

  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  // console.log(data);
  useEffect(() => {
    // Check if social auth session data exists and user is not already authenticated
    if (data && !auth.token) {
      const { user: sessionUser } = data; // Destructure user data from session
      if (sessionUser) {
        // Call the socialAuth mutation with the necessary data
        socialAuth({
          email: sessionUser.email,
          name: sessionUser.name,
          avatar: sessionUser.image,
        });
      }
    }
    if (isSuccess && !auth.token) {
      toast.success("Logged In Successfully");
    }
    if (error && !auth.token) {
      console.log(error);

      toast.success("Error logging in");
    }
  }, [data, auth.token, socialAuth, isSuccess, error]);

  // Use a try-catch to handle potential parsing errors
  let user = null;
  try {
    user = auth.user
      ? typeof auth.user === "string"
        ? (JSON.parse(auth.user) as User)
        : (auth.user as User)
      : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    user = null;
  }

  // console.log("user:", user.user);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    if ((e.target as HTMLElement)?.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 800) {
        setOpenSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to get initials from the name
  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    let initials = "";
    if (nameParts.length > 0) initials += nameParts[0][0]; // First name initial
    if (nameParts.length > 1) initials += nameParts[1][0]; // Last name initial
    return initials.toUpperCase();
  };

  // const handleClose = (e:any) => {
  //   if (e.target.id === "screen") {
  //     {
  //       setOpenSidebar(false);
  //     }
  //   }
  // };
  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#fff] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#fff] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full ">
          <div className="w-full h-[80px] flex items-center justify-between p-3 ">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-poppins font-[500] text-black dark:text-white`}
              >
                E-Learn
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* Mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {user ? (
                <Link
                  href={"/profile"}
                  className="w-[30px] h-[30px] rounded-full font-bold p-3 items-center bg-primary-light flex justify-center text-white"
                >
                  {getInitials(user.name)}
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {/* mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 top-0 right-0 ">
              <NavItems activeItem={activeItem} isMobile={true} />
              {user ? (
                <Link
                  href={"/profile"}
                  className="w-[30px] h-[30px] rounded-full font-bold p-3 items-center bg-primary-light flex justify-center text-white"
                >
                  {getInitials(user.name)}
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                2025 E-Learning
              </p>
            </div>
          </div>
        )}
      </div>
      {/* {
        route === "Sign-Up" && (
          <>

          </>
        )
      } */}
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
      {/* signup */}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Signup}
            />
          )}
        </>
      )}
      {/* verification */}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
}

/**
 * The code is likely being used to create a sticky header that changes its appearance
 * when the user scrolls down the page. When the user scrolls down more than 80 pixels,
 * the header becomes fixed to the top of the page and changes its styles.
 */
