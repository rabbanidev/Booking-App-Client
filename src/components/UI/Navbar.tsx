"use client";

import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { navigation } from "@/constants/navigation";
import { usePathname } from "next/navigation";
import { authLoggedIn } from "@/services/auth.service";
import { useAppSelector } from "@/redux/app/hooks";
import DropDown from "./DropDown";

const Navbar = () => {
  const pathName = usePathname();
  const { accessToken } = useAppSelector((state) => state.auth);
  const isUserLoggedIn = accessToken && authLoggedIn(accessToken);

  const navigationData = navigation.map((nav) =>
    nav.href === pathName ? { ...nav, current: true } : nav
  );

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="container">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-1.5 text-white bg-gray-700">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-between md:items-stretch md:justify-between">
                <div className="flex flex-shrink-0 items-center ml-10 md:ml-0">
                  <Link href="/" className="text-xl font-semibold md:text-2xl">
                    <span className="text-red-600">Booking</span> App
                  </Link>
                </div>
                <div className="hidden md:ml-16 md:block">
                  <div className="flex space-x-4">
                    {navigationData.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`py-2 text-sm font-medium text-gray-900 ${
                          item.current
                            ? "border-b-2 border-red-500 font-semibold text-red-500"
                            : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {isUserLoggedIn && (
                  <div className="flex gap-x-5">
                    <Link
                      href="/carts"
                      className="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm p-2 text-center"
                    >
                      <ShoppingCartIcon className="w-5 h-5" />
                    </Link>
                    <DropDown />
                  </div>
                )}

                {!isUserLoggedIn && (
                  <div className="flex gap-x-5">
                    <Link
                      href="/login"
                      className="py-2 text-sm font-medium text-gray-900"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-2 text-center md:px-5"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
              {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <DropDown />
              </div> */}
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block w-full text-left rounded-md px-3 py-2 mb-1 text-base font-medium ${
                    item.current
                      ? "bg-gray-800 text-white"
                      : "text-gray-600 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
