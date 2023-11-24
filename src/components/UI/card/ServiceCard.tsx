/* eslint-disable @next/next/no-img-element */

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { authLoggedIn } from "@/services/auth.service";
import { IService } from "@/types";
import {
  MapPinIcon,
  ShoppingBagIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/app/hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type IProps = {
  service: IService;
};

const ServiceCard = ({ service }: IProps) => {
  const router = useRouter();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [addToCart, { isError, isSuccess, error }] = useAddToCartMutation();
  const { id: serviceId, name, price, location, rating, image } = service;
  const isUserLoggedIn = accessToken && authLoggedIn(accessToken);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Service added successfully!");
      router.push("/carts");
    }
    if (isError) {
      toast.error((error as any).message) || "Seomenthing went wrong!";
    }
  }, [error, isError, isSuccess, router]);

  const addToCartHandler = () => {
    if (!isUserLoggedIn) {
      toast.error("You are not logged in!");
    } else {
      addToCart({ serviceId });
    }
  };

  return (
    <div className="col-span-1">
      <div className="relative w-full overflow-hidden rounded-lg bg-white shadow-md">
        <Image
          className="w-full h-60 rounded-t-lg object-cover"
          src={image}
          alt={name}
          width={0}
          height={300}
          sizes="100vw"
          objectFit="cover"
          style={{ width: "100%" }}
        />
        <div className="mt-4 px-5 pb-5">
          <Link href={`/services/${serviceId}`}>
            <h5 className="text-xl font-semibold tracking-tight text-slate-900 truncate">
              {name}
            </h5>
          </Link>
          <div className="mt-2.5 mb-5 flex justify-between items-center">
            <div className="flex items-center gap-x-1">
              <MapPinIcon className="w-4 h-4" />
              <span className="text-gray-700 text-sm capitalize">
                {location}
              </span>
            </div>
            {rating && (
              <div className="mr-2 rounded text-red-500 px-2.5 py-0.5 text-xs font-semibold flex gap-x-0.5 items-center">
                {rating.toFixed(1)}
                <StarIcon className="w-3 h-3" />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-slate-900">
              BDT {price}
              <span className="text-gray-700 text-xs font-normal">/person</span>
            </p>

            <button
              type="button"
              className="flex items-center rounded-md bg-slate-900 p-1.5 text-center text-sm font-medium text-white hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-700"
              onClick={addToCartHandler}
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
