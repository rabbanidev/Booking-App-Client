import { IReview } from "@/types/review";
import { numToArray } from "@/utils/numberToArray";
import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type IProps = {
  review: IReview;
};

const ReviewCard = ({ review }: IProps) => {
  const { user, description, rating } = review;

  const name = user?.user
    ? `${user.user.name.firstName} ${user.user.name.lastName}`
    : "";

  return (
    <div className="col-span-1">
      <div className="relative min-h-[250px] w-full overflow-hidden rounded-lg bg-white shadow-md text-center">
        <div className="mt-4 overflow-hidden">
          {user?.user?.profileImage && (
            <Image
              src={user.user.profileImage}
              alt={name}
              className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
              width={0}
              height={0}
              priority
              sizes="100vw"
            />
          )}
          <h5 className="mt-3 text-xl font-semibold tracking-tight text-slate-900 truncate capitalize">
            {name}
          </h5>
        </div>
        <div className="mt-3 flex items-center justify-center gap-0.5">
          {numToArray(rating).map((rate) => (
            <div key={rate} className="rounded text-red-500">
              <StarIcon className="w-3 h-3" />
            </div>
          ))}
        </div>
        <div className="px-5 my-3">
          <p className="text-gray-700 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
