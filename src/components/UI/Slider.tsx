"use client";

import React from "react";
import { Swiper } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Navigation]);

type IProps = {
  children: React.ReactElement | React.ReactNode;
  breakpoints?: Record<string, any>;
};

const defaultBreakpoints = {
  550: {
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
};

const Slider = ({ breakpoints = defaultBreakpoints, children }: IProps) => {
  return (
    <div className="relative">
      <Swiper
        className="mySwiper"
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        breakpoints={breakpoints}
      >
        {children}
        <button type="button" className="swiper-button-prev">
          <BiChevronLeft />
        </button>
        <button type="button" className="swiper-button-next">
          <BiChevronRight />
        </button>
      </Swiper>
    </div>
  );
};

export default Slider;
