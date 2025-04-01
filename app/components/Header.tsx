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
import toast from "react-hot-toast";

interface User {
  token?: string;
  name: string;
}

interface AuthState {
  token: string;
  user: string | User; // Allow string or object
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
  const auth = useSelector((state: RootState) => state.auth) as AuthState;

  // Parse user data safely
  let user: User | null = null;
  try {
    user = auth.user
      ? typeof auth.user === "string"
        ? JSON.parse(auth.user)
        : auth.user
      : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    user = null;
  }

  // Handle manual login success
  useEffect(() => {
    if (auth.token && open && route === "Login") {
      toast.success("Logged In Successfully");
      setOpen(false);
      setRoute("");
    }
  }, [auth.token, open, route, setOpen, setRoute]);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Resize effect for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 800) setOpenSidebar(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    if ((e.target as HTMLElement)?.id === "screen") {
      setOpenSidebar(false);
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : `${nameParts[0][0]}`.toUpperCase();
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#fff] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#fff] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className="text-[25px] font-poppins font-[500] text-black dark:text-white"
              >
                E-Learn
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
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
                  className="w-[40px] h-[40px] rounded-full p-3 items-center bg-primary-light flex justify-center text-white"
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
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              {user ? (
                <Link
                  href={"/profile"}
                  className="w-[30px] h-[30px] rounded-full p-3 items-center bg-primary-light flex justify-center text-white"
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
      {route === "Login" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}
      {route === "Sign-Up" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Signup}
        />
      )}
      {route === "Verification" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </div>
  );
}
