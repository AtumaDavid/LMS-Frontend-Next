import React, { useEffect } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutMutation } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { redirect } from "next/navigation";
import Loader from "../Loader/Loader";
import ProfileInfo from "./ProfileInfo";
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
  // const [logout, setLogout] = React.useState(false);
  // const {} = useLogOutQuery(undefined, { skip: !logout ? true : false });
  const [logOut, { isLoading, error }] = useLogOutMutation();
  // const router = useRouter();

  const dispatch = useDispatch();

  // const logoutHandler = async () => {
  //   try {
  //     await signOut({ redirect: false });

  //     setLogout(true);

  //     dispatch(userLoggedOut());
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };
  const logoutHandler = async () => {
    try {
      // Step 1: Call the backend to clear access_token and refresh_token
      const logoutResponse = await logOut().unwrap();
      if (!logoutResponse.success) {
        throw new Error("Failed to log out from backend");
      }

      // Step 2: Clear the next-auth session
      await signOut({ redirect: false });

      // Step 3: Clear Redux state
      dispatch(userLoggedOut());

      // Step 4: Redirect to the login page
      // setTimeout(() => {
      //   router.push("/");
      // }, 100);

      redirect("/");
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
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && <Loader />}

      {/* Error Message */}
      {error && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {error instanceof Error
            ? error.message
            : "An error occurred during logout. Please try again."}
        </div>
      )}
    </div>
  );
}
