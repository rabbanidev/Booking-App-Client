"use client";

import { useGetServicesQuery } from "@/redux/features/service/serviceApi";
import ServiceCard from "../UI/card/ServiceCard";
import CardLoading from "../UI/loading/CardLoading";
import ErrorMessage from "../UI/error/ErrorMessage";
import Slider from "../UI/Slider";
import { SwiperSlide } from "swiper/react";

const UpcomingService = () => {
  let query: Record<string, any> = {};
  query["isUpcoming"] = true;

  const { isLoading, isError, error, data } = useGetServicesQuery(undefined);

  //Decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CardLoading />
        <CardLoading />
        <CardLoading />
        <CardLoading />
      </div>
    );
  } else if (!isLoading && isError) {
    content = <ErrorMessage errorMessage={(error as any).message} />;
  } else if (!isLoading && !isError && data?.services?.length === 0) {
    content = (
      <ErrorMessage errorMessage="There is no upcoming service available" />
    );
  } else {
    content = (
      <div className="mt-5">
        <Slider>
          {data?.services.map((service) => (
            <SwiperSlide key={service.id}>
              <ServiceCard service={service} />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="container">
        <span className="text-white bg-red-700 hover:bg-red-800 font-normal rounded-full text-sm px-2 py-1 text-center italic">
          Explore
        </span>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Upcoming <span className="text-red-600">Services</span>
        </h3>
        {content}
      </div>
    </section>
  );
};

export default UpcomingService;
