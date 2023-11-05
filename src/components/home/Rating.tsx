"use client";

import { SwiperSlide } from "swiper/react";
import Slider from "../UI/Slider";
import ReviewCard from "../UI/card/ReviewCard";
import { useGetReviewsQuery } from "@/redux/features/review/reviewApi";
import CardLoading from "../UI/loading/CardLoading";
import ErrorMessage from "../UI/error/ErrorMessage";
import SectionTitle from "../shared/SectionTitle";

const Rating = () => {
  const { isLoading, isError, error, data } = useGetReviewsQuery(undefined);

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
  } else if (!isLoading && !isError && data?.reviews.length === 0) {
    content = <ErrorMessage errorMessage="There is no review." />;
  } else {
    content = (
      <div className="mt-5">
        <Slider>
          {data?.reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="container">
        <SectionTitle label="Client" value="Reviews" />
        {content}
      </div>
    </section>
  );
};

export default Rating;
