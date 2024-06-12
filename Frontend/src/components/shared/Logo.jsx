import React from "react";
import { FcLightAtTheEndOfTunnel } from "react-icons/fc";

export const Logo = ({ textSize = null, bg = true }) => {
  return (
    <div
      className={`${
        bg && "w-full bg-blue-200"
      } w-full flex justify-center items-center p-2  select-none text-center`}
    >
      {/* <FcLightAtTheEndOfTunnel className="-mr-2" size={45} /> */}
      <span
        className={`${
          textSize ? textSize : "text-1xl"
        } p-1  text-blue-800 font-bold `}
      >
        {localStorage.getItem('orgname') ? localStorage.getItem('orgname') : 'New Organization'}
      </span>
    </div>
  );
};
