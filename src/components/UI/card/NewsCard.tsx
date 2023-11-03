"use client";
import { INews } from "@/types";
import Image from "next/image";

type IProps = {
  news: INews;
};

const NewsCard = ({ news }: IProps) => {
  const { image, title, description } = news;

  return (
    <div className="col-span-1">
      <div className="relative w-full overflow-hidden rounded-lg bg-white shadow-md">
        <Image
          className="w-full h-60 rounded-t-lg object-cover"
          src={image}
          alt={title}
          width={0}
          height={300}
          sizes="100vw"
          objectFit="cover"
          style={{ width: "100%" }}
        />
        <div className="mt-4 px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-slate-900 truncate">
            {title}
          </h5>
          <p className="mt-4 text-gray-700 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
