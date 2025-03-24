import React from "react";
import SidebarProfile from "./SidebarProfile";
// import { User } from "@/redux/features/auth/authSlice";

export interface UserProfile {
  name: string;
  email?: string;
  avatar?: string;
}

export interface ProfileProps {
  user: UserProfile | null;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: () => void;
}

export default function Profile({ user }: ProfileProps) {
  const [scroll, setScroll] = React.useState(false);
  const [avatar, setAvatar] = React.useState(null);
  const [active, setActive] = React.useState(1);

  const logoutHandler = async () => {};

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] bg-slate-900 bg-opacity-90 border border-[#ffffff1d] rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
    </div>
  );
}
