import Image from "next/image";

type IProps = {
  url: string;
  title?: string;
};

const ProductDetailsImage = ({ url, title = "" }: IProps) => {
  return (
    <Image
      src={url}
      alt={title}
      width={0}
      height={0}
      className="w-full h-80 rounded-xl object-cover"
      sizes="100vw"
      objectFit="cover"
    />
  );
};

export default ProductDetailsImage;
