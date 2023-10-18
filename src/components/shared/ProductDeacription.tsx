import { MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";

type IProps = {
  category: string;
  name: string;
  location: string;
  maxSize: number;
  rating?: number;
  price: number;
  description?: string;
};

const ProductDeacription = ({
  category,
  name,
  location,
  maxSize,
  rating,
  price,
  description,
}: IProps) => {
  return (
    <div className="mt-5 p-5 rounded-xl w-full shadow relative">
      {rating && (
        <span className="absolute top-6 right-5 rounded bg-red-500 text-white px-2.5 py-0.5 text-xs font-semibold">
          5.0
        </span>
      )}
      <h5 className="text-lg font-medium tracking-tight text-gray-700 truncate">
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
    </div>
  );
};

export default ProductDeacription;
