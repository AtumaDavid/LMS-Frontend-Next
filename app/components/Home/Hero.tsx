import Image from "next/image";
import React from "react";
import HeroBanner from "../../assets/HeroBanner.png";
import { BiSearch } from "react-icons/bi";

export default function Hero() {
  return (
    <div className="w-full min-h-screen relative pt-10">
      <div className="w-full max-w-[80%] mx-auto px-4 flex flex-col 1000px:flex-row items-center justify-between gap-10 ">
        {/* Left Circle Container */}
        <div className="w-[80%] 1000px:w-[40%] relative ">
          <div className="aspect-square relative">
            <div className="hero_animation absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
              <div className="w-[85%] h-[85%] flex items-center justify-center">
                <Image
                  src={HeroBanner}
                  alt="hero-banner"
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="w-full 1000px:w-[60%] flex flex-col items-center text-center mt-[50px] 1000px:mt-0 1000px:items-start 1000px:text-left ">
          <h2 className="font-bold text-3xl sm:text-4xl 800px:text-5xl 1000px:text-6xl font-Josefin px-6 1000px:px-0">
            Improve Your Online Learning Experience Better Instantly
          </h2>

          <p className="text-[#000000ac] dark:text-[#ffffffac] text-[16px] font-Josefin font-[600] mt-4 px-8 1000px:px-0">
            We have 40k+ Online courses & 500K+ Online registered student. Find
            your desired Courses from them.
          </p>

          {/* Search Bar */}
          <div className="relative w-[90%] sm:w-[80%] max-w-[600px] mt-8">
            <input
              type="text"
              placeholder="Search Courses..."
              className="bg-transparent border dark:border-[#ffffff57] border-[#00000067] rounded-[5px] w-full p-3 pr-10"
            />
            <div className="absolute right-0 top-0 h-full flex items-center pr-4 cursor-pointer">
              <BiSearch className="text-2xl text-[#000000bc] dark:text-[#ffffffbc]" />
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center 1000px:justify-start gap-2 sm:gap-0 mt-8">
            <div className="flex items-center -space-x-1.5">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"
                />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-0">
              <p className="ml-3 text-[#000000ac] dark:text-[#ffffffac]">
                500K+ People already trusted us.
              </p>
              <span className="text-[#2526e3] cursor-pointer ml-1">
                View Courses
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
