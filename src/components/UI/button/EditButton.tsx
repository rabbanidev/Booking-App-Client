"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const EditButton = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-2 py-2"
    >
      <PencilSquareIcon className="w-4 h-4" />
    </Link>
  );
};

export default EditButton;
