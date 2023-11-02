"use client";

import { useGetServicesQuery } from "@/redux/features/service/serviceApi";
import ServiceCard from "../UI/card/ServiceCard";
import CardLoading from "../UI/loading/CardLoading";
import ErrorMessage from "../UI/error/ErrorMessage";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Navigation]);

const UpcomingService = () => {
  // let query: Record<string, any> = {};
  // query["isUpcoming"] = true;

  // const { isLoading, isError, error, data } = useGetServicesQuery(query);

  // //Decide what to render
  // let content = null;
  // if (isLoading) {
  //   content = (
  //     <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  //       <CardLoading />
  //       <CardLoading />
  //       <CardLoading />
  //       <CardLoading />
  //     </div>
  //   );
  // } else if (!isLoading && isError) {
  //   content = <ErrorMessage errorMessage={(error as any).message} />;
  // } else if (!isLoading && !isError && data?.services?.length === 0) {
  //   content = (
  //     <ErrorMessage errorMessage="There is no upcoming service available" />
  //   );
  // } else {
  //   content = (
  //     <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  //       {data?.services.map((service) => (
  //         <ServiceCard key={service.id} service={service} />
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <section className="mt-10 mb-10">
      <div className="container">
        <span className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm px-2 py-1 text-center italic">
          Explore
        </span>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Available <span className="text-red-600">Services</span>
        </h3>
        <div className="relative mt-2">
          <Swiper
            className="mySwiper"
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 25,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
            }}
          >
            <SwiperSlide>
              <CardLoading />
            </SwiperSlide>
            <SwiperSlide>
              <CardLoading />
            </SwiperSlide>
            <SwiperSlide>
              <CardLoading />
            </SwiperSlide>
            <SwiperSlide>
              <CardLoading />
            </SwiperSlide>
          </Swiper>
          <button type="button" className="swiper-button-prev">
            <BiChevronLeft />
          </button>
          <button type="button" className="swiper-button-next">
            <BiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingService;
