"use client";

import { authKey } from "@/constants/storageKey";
import useGetLocalStorage from "@/hooks/useGetLocalStorage";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { loggedIn, loggedOut } from "@/redux/features/auth/authSlice";
import { removeUserInfo } from "@/services/auth.service";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { loading } = useGetLocalStorage(authKey, loggedIn);

  const logoutHandler = () => {
    dispatch(loggedOut());
    removeUserInfo();
  };

  return (
    <aside className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-indigo-500">
      <div className="sidebar-header flex items-center justify-center py-4">
        <div className="inline-flex">
          <a href="#" className="inline-flex flex-row items-center">
            <svg
              className="w-10 h-10 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.757 2.034a1 1 0 01.638.519c.483.967.844 1.554 1.207 2.03.368.482.756.876 1.348 1.467A6.985 6.985 0 0117 11a7.002 7.002 0 01-14 0c0-1.79.684-3.583 2.05-4.95a1 1 0 011.707.707c0 1.12.07 1.973.398 2.654.18.374.461.74.945 1.067.116-1.061.328-2.354.614-3.58.225-.966.505-1.93.839-2.734.167-.403.356-.785.57-1.116.208-.322.476-.649.822-.88a1 1 0 01.812-.134zm.364 13.087A2.998 2.998 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879.586.585.879 1.353.879 2.121s-.293 1.536-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            <span className="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase">
              BOOKING APP
            </span>
          </a>
        </div>
      </div>
      <div className="sidebar-content px-4 py-6">
        <ul className="flex flex-col w-full">
          <SidebarItems />

          <li className="my-px">
            <button
              type="button"
              className="flex flex-row items-center w-full h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
              onClick={logoutHandler}
            >
              <LockClosedIcon className="h-5 w-5" />
              <span className="ml-3 mt-1">Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
