"use client";

import Link from "next/link";

const ActionBar = ({ href, text }: { text: string; href?: string }) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-semibold ">{text}</h1>
      {href && (
        <Link
          href={href}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Create
        </Link>
      )}
    </div>
  );
};

export default ActionBar;
