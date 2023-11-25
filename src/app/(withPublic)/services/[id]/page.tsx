"use client";

import ErrorMessage from "@/components/UI/error/ErrorMessage";
import SpinarLoader from "@/components/UI/loading/SpinarLoader";
import ProductDetailsImage from "@/components/shared/ProductDetailsImage";
import ProductDeacription from "@/components/shared/ProductDeacription";
import { useGetServiceQuery } from "@/redux/features/service/serviceApi";
import Star from "@/components/shared/Star";
import ReviewList from "@/components/shared/ReviewList";
import { MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type IDefaultProps = {
  params: any;
};

const ServicePage = ({ params }: IDefaultProps) => {
  const { isLoading, isError, error, data } = useGetServiceQuery(params.id);

  //Decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <SpinarLoader />
      </div>
    );
  } else if (!isLoading && isError) {
    content = (
      <div className="mt-20 md:flex justify-center flex-col items-center">
        <ErrorMessage errorMessage={(error as any).message} />
      </div>
    );
  } else if (!isLoading && !isError && !data?.service) {
    content = (
      <div className="mt-20 md:flex justify-center flex-col items-center">
        <ErrorMessage errorMessage="Service Not Found!" />
      </div>
    );
  } else {
    const {
      category,
      name,
      image,
      location,
      maxSize,
      rating,
      price,
      description,
      isUpcoming,
    } = data?.service;

    content = (
      <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-12 lg:gap-y-0 lg:gap-x-10">
        <div className="col-span-1 lg:col-span-6">
          <ProductDetailsImage url={image} title={name} />
        </div>
        <div className="col-span-1 lg:col-span-6">
          <ProductDeacription
            bookId={params.id}
            category={category}
            name={name}
            location={location}
            maxSize={maxSize}
            rating={rating}
            price={price}
            description={description}
            bookBtnShow={!isUpcoming}
          />
        </div>
        <div className="col-span-1 lg:col-span-6">
          <ReviewList productId={params.id} />
        </div>
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="container">{content}</div>
    </section>
  );
};

export default ServicePage;
