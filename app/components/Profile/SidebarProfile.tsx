import React from "react";
import { ProfileProps } from "./Profile";
import Image from "next/image";

export default function SidebarProfile({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}: ProfileProps) {
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
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        {hasAvatar ? (
          <Image
            src={user?.avatar || avatar!} // Non-null assertion since we checked
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
    </div>
  );
}
