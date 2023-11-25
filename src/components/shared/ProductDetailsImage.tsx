import Image from "next/image";

type IProps = {
  url: string;
  title?: string;
  height?: string;
};

const ProductDetailsImage = ({ url, title = "", height = "h-80" }: IProps) => {
  return (
    <Image
      src={url}
      alt={title}
      width={0}
      height={0}
      className={`w-full rounded-xl object-cover ${height}`}
      sizes="100vw"
      objectFit="cover"
    />
  );
};

export default ProductDetailsImage;
