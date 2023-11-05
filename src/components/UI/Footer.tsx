"use client";

import { footerNavigation } from "@/constants/navigation";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-10 w-full h-auto bg-gray-800 text-white py-5">
      <div className="container">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="text-xl font-semibold md:text-2xl">
            <span className="text-red-600">Booking</span> App
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            {footerNavigation.map((nav) => (
              <li key={nav.name}>
                <Link href={nav.href} className="mr-4 hover:underline md:mr-6">
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-5 border-gray-200 sm:mx-auto 700" />
        <span className="block text-sm sm:text-center">
          Built By{" "}
          <a
            href="https://github.com/rabbanidev"
            className="hover:underline"
            target="_blank"
          >
            Golam Rabbani
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
