"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const navigateHandler = () => {
    router.back();
  };

  return (
    <button
      type="button"
      className="mt-5 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2 text-center"
      onClick={navigateHandler}
    >
      <span className="ml-2">Back</span>
    </button>
  );
};

export default BackButton;
