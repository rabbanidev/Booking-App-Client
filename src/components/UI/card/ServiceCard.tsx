/* eslint-disable @next/next/no-img-element */
import { IService } from "@/types";
import { MapPinIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

type IProps = {
  service: IService;
};

const ServiceCard = ({ service }: IProps) => {
  const { name, price, location } = service;

  return (
    <div className="col-span-1">
      <div className="relative w-full overflow-hidden rounded-lg bg-white shadow-md">
        <img
          className="w-full h-60 rounded-t-lg object-cover"
          src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="product image"
        />
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-slate-900 truncate">
              {name}
            </h5>
          </a>
          <div className="mt-2.5 mb-5 flex justify-between items-center">
            <div className="flex items-center gap-x-1">
              <MapPinIcon className="w-4 h-4" />
              <span className="text-gray-700 text-sm capitalize">
                {location}
              </span>
            </div>
            <span className="mr-2 rounded bg-red-500 text-white px-2.5 py-0.5 text-xs font-semibold">
              5.0
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-slate-900">
              ${price}
              <span className="text-gray-700 text-xs font-normal">/person</span>
            </p>

            <button
              type="button"
              className="flex items-center rounded-md bg-slate-900 p-1.5 text-center text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-700"
            >
              <ShoppingBagIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
