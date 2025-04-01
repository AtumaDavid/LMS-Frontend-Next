import React from "react";
import { SideProfileProps } from "./Profile";
import Image from "next/image";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";

export default function SidebarProfile({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}: SideProfileProps) {
  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : `${nameParts[0][0]}`.toUpperCase();
  };

  const hasAvatar = user?.avatar || avatar;

  return (
    <div className="w-full">
      {/* my account */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        {hasAvatar ? (
          <Image
            src={user?.avatar || avatar!}
            alt="avatar"
            width={40}
            height={40}
          />
        ) : (
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-primary-light text-white rounded-full">
            {getInitials(user?.name)}
          </div>
        )}
        <h5 className="pl-2 800px:block hidden font-poppins">My Account</h5>
      </div>
      {/* change password */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"
        }
`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} />
        <h5 className="pl-2 800px:block hidden font-poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>
      {/* enrolled courses */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"
        }
`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} />
        <h5 className="pl-2 800px:block hidden font-poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>
      {/* logout */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"
        }
`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} />
        <h5 className="pl-2 800px:block hidden font-poppins dark:text-white text-black">
          Logout
        </h5>
      </div>
    </div>
  );
}
