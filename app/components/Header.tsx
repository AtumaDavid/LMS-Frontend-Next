"use client";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

export default function Header({ open, setOpen, activeItem }: Props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [active, setActive] = useState(false);

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
              <HiOutlineUserCircle
                size={25}
                className="hidden 800px:block cursor-pointer dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
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
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 dark:text-white text-black "
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                2025 E-Learning
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * The code is likely being used to create a sticky header that changes its appearance
 * when the user scrolls down the page. When the user scrolls down more than 80 pixels,
 * the header becomes fixed to the top of the page and changes its styles.
 */
