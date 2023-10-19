import { StarIcon } from "@heroicons/react/24/outline";
import React from "react";

const Star = ({ rating }: { rating: number }) => {
  if (!rating) {
    return null;
  }

  return (
    <div className="absolute top-6 right-5 rounded text-red-500 px-2.5 py-0.5 text-xs font-semibold flex gap-x-0.5 items-center">
      {rating.toFixed(1)}
      <StarIcon className="w-3 h-3" />
    </div>
  );
};

export default Star;
