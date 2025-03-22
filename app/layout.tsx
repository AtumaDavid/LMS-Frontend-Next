"use client";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { setSocialAuthCompleted } from "@/redux/features/auth/authSlice";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

function AppContent({ children }: { children: React.ReactNode }) {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { data, status } = useSession();
  const [
    socialAuth,
    { isSuccess, error, isLoading: isSocialAuthLoading },
  ] = useSocialAuthMutation();

  // Handle social auth at the app level
  useEffect(() => {
    if (
      status === "authenticated" &&
      !auth.token &&
      !auth.socialAuthCompleted &&
      data &&
      !isSocialAuthLoading
    ) {
      const { user: sessionUser } = data;
      if (sessionUser) {
        socialAuth({
          email: sessionUser.email ?? "",
          name: sessionUser.name ?? "",
          avatar: sessionUser.image ?? "",
        });
      }
    }

    if (isSuccess && !auth.socialAuthCompleted) {
      toast.success("Logged In Successfully via Social Auth");
      dispatch(setSocialAuthCompleted(true));
    }

    if (error) {
      toast.error("Error logging in with social auth");
    }
  }, [
    data,
    status,
    auth.token,
    auth.socialAuthCompleted,
    socialAuth,
    isSuccess,
    error,
    isSocialAuthLoading,
    dispatch,
  ]);

  return (
    <>
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  return <>{isLoading ? <Loader /> : children}</>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>
                <AppContent>{children}</AppContent>
              </Custom>
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
