import { MapPinIcon, StarIcon, UsersIcon } from "@heroicons/react/24/outline";
import Star from "./Star";
import Link from "next/link";

type IProps = {
  bookId: string;
  category: string;
  name: string;
  location: string;
  maxSize: number;
  rating?: number;
  price: number;
  description?: string;
  bookBtnShow?: boolean;
};

const ProductDescription = ({
  bookId,
  category,
  name,
  location,
  maxSize,
  rating,
  price,
  description,
  bookBtnShow = false,
}: IProps) => {
  return (
    <div className="p-5 rounded-xl w-full shadow relative">
      {rating && <Star rating={rating} />}

      <h5 className="text-xl font-medium tracking-tight text-gray-900 truncate">
        {name}
      </h5>
      <div className="mt-5 flex gap-x-10">
        <div className="flex items-center gap-x-1">
          <MapPinIcon className="w-4 h-4" />
          <span className="text-gray-700 text-sm capitalize">{location}</span>
        </div>
        <p className="text-gray-700 text-sm">
          BDT {price}
          <span className="text-xs font-normal">/person</span>
        </p>
        <div className="flex items-center gap-x-1">
          <UsersIcon className="w-4 h-4" />
          <span className="text-gray-700 text-sm capitalize">
            {maxSize} People
          </span>
        </div>
      </div>
      {description && (
        <div className="mt-5">
          <p className="text-base font-medium tracking-tight text-gray-700">
            Description
          </p>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
      )}
      {bookBtnShow && (
        <div className="mt-5">
          <Link
            href={`/bookings/${bookId}`}
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Book
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
