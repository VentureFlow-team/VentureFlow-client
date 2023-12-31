import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { muteToggle, deafenToggle } from "@/redux/features/user-panel";
import { Dropdown } from "flowbite";
import {
  displayToggle,
  setStatus,
  dropDownToggle,
} from "@/redux/features/userpanel-custom";
import { BsCircleFill } from "react-icons/bs";
import { MdDoNotDisturbOn } from "react-icons/md";
import { BiSolidMoon } from "react-icons/bi";
import { FaCircleDot } from "react-icons/fa6";

const StatusIcon = (status: string) => {
  // Define the mapping of status values to React Icons
  const iconMapping: any = {
    Online: (
      <BsCircleFill className="border-[3px] absolute bottom-0 right-0 rounded-full text-green-400 bg-[#292B2F] border-[#292B2F]" />
    ),
    Idle: (
      <BiSolidMoon className="border-2 absolute bottom-0 right-0 rounded-full text-yellow-400 bg-[#292B2F] border-[#292B2F]" />
    ),
    "Do not Disturb": (
      <MdDoNotDisturbOn className="border-2 absolute bottom-0 right-0 rounded-full text-red-400 bg-[#292B2F] border-[#292B2F]" />
    ),
    Invisible: (
      <FaCircleDot className="border-[3px] absolute bottom-0 right-0 rounded-full text-gray-400 bg-[#292B2F] border-[#292B2F]" />
    ),
    // Add more status values and icons as needed
  };

  // Check if the status exists in the mapping, otherwise provide a default icon
  const icon = iconMapping[status] || <div>Unknown Status</div>;

  return <div className="status-icon">{icon}</div>;
};

export default function UserPanel() {
  const { isMuted, UserName, DropDownOpen, status, isOpen, isDeafened } =
    useSelector((state: RootState) => ({
      isMuted: state.userPanel.isMuted,
      UserName: state.userDetails.UserName,
      DropDownOpen: state.userPanelCustom.dropDown,
      status: state.userPanelCustom.status,
      isOpen: state.userPanelCustom.isOpen,
      isDeafened: state.userPanel.isDeafened,
    }));

  const dispatch = useDispatch<AppDispatch>();

  const handleDropDownToggle = () => {
    dispatch(dropDownToggle());
  };

  const handleMuteToggle = () => {
    dispatch(muteToggle());
  };

  const handleStatus = (newStatus: any) => {
    dispatch(setStatus(newStatus));
  };

  const OpenModal = () => {
    dispatch(displayToggle());
  };

  const handleDeafenToggle = () => {
    dispatch(deafenToggle());
  };

  const options = ["Online", "Idle", "Do not Disturb", "Invisible"];

  return (
    <div className="bg-profile h-[52px] w-full p-[6px] flex items-center relative">
      {isOpen && (
        <div className="absolute w-[340px] h-[400px] flex flex-col top-0 shadow-lg -translate-y-[calc(100%_+_0.5rem)] rounded-lg bg-[#36393f]">
          <div className="h-[60px] p-4 w-full relative">
            <div className="absolute bottom-0 h-20 rounded-full ring-8 ring-[#222528] translate-y-1/2 aspect-square bg-slate-300"></div>
          </div>
          <div className="bg-[#222528] h-full p-4 pt-14 w-full">
            <div className="bg-[#111315] h-full p-3 rounded-lg">
              <div className="text-slate-200">
                <div className="font-semibold text-xl">{UserName}</div>

                <div className="relative">
                  <div
                    className="py-2 px-4 border rounded text-slate-500 w-full"
                    onClick={handleDropDownToggle}
                  >
                    {status}
                  </div>
                  {DropDownOpen && (
                    <ul className="border absolute right-0 translate-x-full rounded shadow-lg">
                      {options.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleStatus(option)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={OpenModal}
        className="flex w-full rounded gap-1 h-full hover:bg-secondary p-1 truncate"
      >
        <div className="h-full w-fit relative bg-slate-100 aspect-square rounded-full">
          {StatusIcon(status)}
        </div>

        <div className="flex flex-col justify-between h-full w-full">
          <div className="text-slate-200 text-sm font-semibold w-full truncate">
            {UserName}
          </div>
          <div className="text-slate-200 text-xs">{status}</div>
        </div>
      </div>
      <div className="flex w-fit">
        <button
          className="w-8 aspect-square rounded flex items-center justify-center hover:bg-secondary"
          onClick={handleMuteToggle}
        >
          {isMuted ? (
            <svg
              aria-hidden="true"
              role="img"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11Z"
                fill="currentColor"
              ></path>
              <path
                d="M9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085Z"
                fill="currentColor"
              ></path>
              <path
                d="M11.7237 16.0927L10.9632 16.8531L10.2533 17.5688C10.4978 17.633 10.747 17.6839 11 17.72V22H13V17.72C16.28 17.23 19 14.41 19 11H17.3C17.3 14 14.76 16.1 12 16.1C11.9076 16.1 11.8155 16.0975 11.7237 16.0927Z"
                fill="currentColor"
              ></path>
              <path
                d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z"
                fill="red"
              ></path>
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              role="img"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V21H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1ZM12 4C11.2 4 11 4.66667 11 5V11C11 11.3333 11.2 12 12 12C12.8 12 13 11.3333 13 11V5C13 4.66667 12.8 4 12 4Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V22H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1Z"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </button>
        <button
          className="w-8 aspect-square rounded flex items-center justify-center hover:bg-secondary"
          onClick={handleDeafenToggle}
        >
          {isDeafened ? (
            <svg
              aria-hidden="true"
              role="img"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M6.16204 15.0065C6.10859 15.0022 6.05455 15 6 15H4V12C4 7.588 7.589 4 12 4C13.4809 4 14.8691 4.40439 16.0599 5.10859L17.5102 3.65835C15.9292 2.61064 14.0346 2 12 2C6.486 2 2 6.485 2 12V19.1685L6.16204 15.0065Z"
                fill="currentColor"
              ></path>
              <path
                d="M19.725 9.91686C19.9043 10.5813 20 11.2796 20 12V15H18C16.896 15 16 15.896 16 17V20C16 21.104 16.896 22 18 22H20C21.105 22 22 21.104 22 20V12C22 10.7075 21.7536 9.47149 21.3053 8.33658L19.725 9.91686Z"
                fill="currentColor"
              ></path>
              <path
                d="M3.20101 23.6243L1.7868 22.2101L21.5858 2.41113L23 3.82535L3.20101 23.6243Z"
                fill="red"
              ></path>
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              role="img"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M12 2.00305C6.486 2.00305 2 6.48805 2 12.0031V20.0031C2 21.1071 2.895 22.0031 4 22.0031H6C7.104 22.0031 8 21.1071 8 20.0031V17.0031C8 15.8991 7.104 15.0031 6 15.0031H4V12.0031C4 7.59105 7.589 4.00305 12 4.00305C16.411 4.00305 20 7.59105 20 12.0031V15.0031H18C16.896 15.0031 16 15.8991 16 17.0031V20.0031C16 21.1071 16.896 22.0031 18 22.0031H20C21.104 22.0031 22 21.1071 22 20.0031V12.0031C22 6.48805 17.514 2.00305 12 2.00305Z"
                  fill="currentColor"
                ></path>
              </svg>
            </svg>
          )}
        </button>
        <button className="w-8 aspect-square rounded flex items-center justify-center hover:bg-secondary">
          <svg
            aria-hidden="true"
            role="img"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
