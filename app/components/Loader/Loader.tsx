import React from "react";
// import "./Loader.css";

export default function Loader() {
  return (
    <div className=" fixed inset-0 bg-secondary bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-4 text-white">Loading...</span>
    </div>
  );
}
