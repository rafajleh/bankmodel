import React from "react";
import {
  FcBusinessman,
  FcConferenceCall,
  FcNews,
  FcVoicePresentation,
} from "react-icons/fc";
import { useSelector } from "react-redux";

export const DashboardNavbar = ({ activeTab, setActiveTab }) => {
  const navTabs = [
    {
      stateName: "adminsList",
      tabName: "All Bank Lists",
      icon: FcVoicePresentation,
    },
    {
      stateName: "usersList",
      tabName: "Account Opening Request",
      icon: FcNews,
    },
    {
      stateName: "usersRequests",
      tabName: "Users Accounts",
      icon: FcNews,
    },
    {
      stateName: "addAdmin",
      tabName: "Add New Admins",
      icon: FcBusinessman,
    },
  ];

  const { info } = useSelector((state) => state.adminAuth);

  return (
    <div className="max-w-5xl w-full">
      <nav className="m-auto text-blue-800">
        <ul className="flex justify-center flex-wrap gap-4 p-4 text-sm">
          {navTabs.map((tab, index) => (
            <li
              key={index}
              className={`flex justify-center items-center cursor-pointer p-5 hover:text-blue-700 hover:underline  ${
                activeTab === tab.stateName
                  ? " font-bold underline underline-offset-2 bg-green-200"
                  : " font-semibold bg-blue-200"
              }
              ${
                info.role !== "owner" &&
                (index === 0 || index === 3) &&
                "hidden"
              }`}
              onClick={() => setActiveTab(tab.stateName)}
            >
              <tab.icon className="mr-1" size={25} />
              <span>{tab.tabName}</span>




            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
