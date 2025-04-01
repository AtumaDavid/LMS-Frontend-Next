import React, { useEffect } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
// import { redirect } from "next/navigation";
// import { User } from "@/redux/features/auth/authSlice";

export interface UserProfile {
  name: string;
  email?: string;
  avatar?: string;
}

export interface ProfileProps {
  user: UserProfile | null;
}

export interface SideProfileProps {
  user: UserProfile | null;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: () => void;
}

export default function Profile({ user }: ProfileProps) {
  const [scroll, setScroll] = React.useState(false);
  const [avatar] = React.useState(null);
  const [active, setActive] = React.useState(1);
  const [logout, setLogout] = React.useState(false);
  const {} = useLogOutQuery(undefined, { skip: !logout ? true : false });

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await signOut({ redirect: false });

      setLogout(true);

      dispatch(userLoggedOut());
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border dark:border-[#ffffff1d] rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${
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
