"use client";

import ErrorMessage from "@/components/UI/error/ErrorMessage";
import SpinarLoader from "@/components/UI/loading/SpinarLoader";
import ProductDetailsImage from "@/components/shared/ProductDetailsImage";
import ProductDeacription from "@/components/shared/ProductDeacription";
import { useGetServiceQuery } from "@/redux/features/service/serviceApi";
import Star from "@/components/shared/Star";
import ReviewList from "@/components/shared/ReviewList";

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
    } = data?.service;

    content = (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-10 xl:gap-20">
        <div className="col-span-1 lg:col-span-8">
          <ProductDetailsImage url={image} title={name} />
          <ProductDeacription
            category={category}
            name={name}
            location={location}
            maxSize={maxSize}
            rating={rating}
            price={price}
            description={description}
          />
          <ReviewList productId={params.id} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="p-5 rounded-xl w-full shadow relative">
            <p className="text-lg font-medium tracking-tight">
              BDT {price}
              <span className="text-xs font-normal">/person</span>
            </p>
            {rating && <Star rating={rating} />}
          </div>
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
