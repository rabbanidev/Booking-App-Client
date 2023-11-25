import { StarIcon } from "@heroicons/react/24/outline";
import { numToArray } from "@/utils/numberToArray";
import { useGetProductReviewQuery } from "@/redux/features/review/reviewApi";
import { dateFormate } from "@/utils/moment";
import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
const ReviewList = ({ productId }: { productId: string }) => {
  const { data } = useGetProductReviewQuery(productId);
  return (
    <div className="w-full">
      <div className="mt-5 block rounded-lg bg-white p-5 shadow">
        <p className="mb-5 text-xl font-medium tracking-tight text-gray-900">
          Reviews ({data?.reviews?.length})
        </p>
        <div className="grid grid-rows-1 gap-y-5">
          {data?.reviews &&
            data.reviews.length > 0 &&
            data.reviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 p-2.5 rounded"
              >
                <div className="flex justify-between">
                  <div className="flex gap-x-2">
                    <div className="flex w-10 items-center justify-center">
                      {review.user.user?.profileImage && (
                        <Image
                          src={review.user.user?.profileImage}
                          className="rounded"
                          alt={`${review.user.user?.name.firstName} ${review.user.user?.name.lastName}`}
                          width={32}
                          height={28}
                          objectFit="cover"
                          priority
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-base font-medium tracking-tight text-gray-700">
                        {`${review.user.user?.name.firstName} ${review.user.user?.name.lastName}`}
                      </p>
                      <p className="text-sm font-medium tracking-tight text-gray-700">
                        {dateFormate(review.createdAt, "ll")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-x-[1px]">
                    {numToArray(review.rating).map((rate) => (
                      <div key={rate} className="rounded text-red-500">
                        <StarIcon className="w-3 h-3" />
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {review.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;

{
  /* <p className="mb-2 text-sm font-normal font-light text-neutral-500">
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quam
sapiente molestiae numquam quas, voluptates omnis nulla ea odio
quia similique corrupti magnam.
</p> */
}
