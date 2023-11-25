"use client";

import { useGetServicesQuery } from "@/redux/features/service/serviceApi";
import ServiceCard from "../UI/card/ServiceCard";
import CardLoading from "../UI/loading/CardLoading";
import ErrorMessage from "../UI/error/ErrorMessage";
import Slider from "../UI/Slider";
import { SwiperSlide } from "swiper/react";
import SectionTitle from "../shared/SectionTitle";

const UpcomingService = () => {
  let query: Record<string, any> = {};
  query["isUpcoming"] = true;

  const { isLoading, isError, error, data } = useGetServicesQuery(query);

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
    <section className="py-10">
      <div className="container">
        <SectionTitle label="Upcoming" value="Services" />
        {content}
      </div>
    </section>
  );
};

export default UpcomingService;
