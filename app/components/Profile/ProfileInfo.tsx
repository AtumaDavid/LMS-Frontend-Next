import React from "react";
import { UserProfile } from "./Profile";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";
export interface ProfileInfoProps {
  user: UserProfile | null;
  avatar?: string | null;
}

export default function ProfileInfo({ avatar, user }: ProfileInfoProps) {
  const [name, setName] = React.useState<string>(user?.name || "");

  const imageHandler = async () => {
    console.log("ggg");
  };

  const handleSubmit = async () => {
    console.log("submit");
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : `${nameParts[0][0]}`.toUpperCase();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <div className="w-full flex justify-center">
          <div className="relative">
            {user?.avatar || avatar ? (
              <Image
                src={user?.avatar || avatar || ""}
                alt="User Avatar"
                //   width={80}
                //   height={80}
                className="w-[120px] h-[120px] rounded-full object-cover"
              />
            ) : (
              <div className="w-[120px] h-[120px] flex items-center justify-center bg-primary-light text-white rounded-full text-2xl mr-4">
                {getInitials(user?.name)}
              </div>
            )}
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700"
            >
              <FiCamera size={20} className="text-white" />
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={imageHandler}
              />
            </label>
          </div>
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium dark:text-white text-black mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border dark:border-[#ffffff1d] rounded-md dark:bg-slate-800 bg-white dark:text-white text-black focus:outline-none focus:ring-2 focus:ring-primary-light"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field (Read-only) */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium dark:text-white text-black mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-3 py-2 border dark:border-[#ffffff1d] rounded-md dark:bg-slate-800 bg-gray-100 dark:text-gray-400 text-gray-600 cursor-not-allowed"
            placeholder="Your email"
          />
        </div>
        {/* Update Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-primary-light hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
}
