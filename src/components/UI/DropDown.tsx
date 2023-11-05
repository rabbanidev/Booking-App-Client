/* eslint-disable @next/next/no-img-element */
"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { loggedOut } from "@/redux/features/auth/authSlice";
import { useGetMyInfoQuery } from "@/redux/features/users/usersApi";
import Image from "next/image";

const DropDown = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const { data } = useGetMyInfoQuery(undefined);

  const userInfo = accessToken && getUserInfo(accessToken);

  const logoutHandler = () => {
    dispatch(loggedOut());
    removeUserInfo();
  };

  const user = data?.user?.superAdmin || data?.user?.admin || data?.user?.user;
  const userName = `${user?.name?.firstName} ${user?.name?.lastName}`;

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button
          as="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {user?.profileImage && (
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src={user?.profileImage}
              alt={userName}
            />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <Link
              href={`/${(userInfo as any)?.role}/profile`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Your Profile
            </Link>
          </Menu.Item>
          <Menu.Item>
            <button
              type="button"
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={logoutHandler}
            >
              Log Out
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropDown;
