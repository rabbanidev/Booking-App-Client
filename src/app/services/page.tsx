"use client";
import { useState } from "react";
import Searchbar from "@/components/UI/Searchbar";
import Select from "@/components/forms/Select";
import { paginationLimits, serviceSorting } from "@/constants/pagination";
import ServiceCard from "@/components/UI/card/ServiceCard";
import useDebounced from "@/hooks/useDebounced";
import { useGetServicesQuery } from "@/redux/features/service/serviceApi";
import CardLoading from "@/components/UI/loading/CardLoading";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import Pagination from "@/components/UI/Pagination";

const ServicesPage = () => {
  const query: Record<string, any> = {};
  const [sorting, setSorting] = useState<any>(serviceSorting[0]);
  const [limit, setLimit] = useState<any>(paginationLimits[1]);
  const [page, setPage] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSeacrhTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  const debouncedMinPrice = useDebounced({
    searchQuery: minPrice,
    delay: 600,
  });
  const debouncedMaxPrice = useDebounced({
    searchQuery: maxPrice,
    delay: 600,
  });

  query["page"] = page;
  query["limit"] = limit.value;
  query["sortOrder"] = sorting.sortOrder;
  query["sortBy"] = sorting.sortBy;

  if (!!debouncedSeacrhTerm) {
    query["searchTerm"] = debouncedSeacrhTerm;
  }
  if (!!debouncedMinPrice) {
    query["minPrice"] = debouncedMinPrice;
  }
  if (!!debouncedMaxPrice) {
    query["maxPrice"] = debouncedMaxPrice;
  }

  const { isLoading, isError, error, data } = useGetServicesQuery(query);

  //Decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <CardLoading />
        <CardLoading />
        <CardLoading />
        <CardLoading />
        <CardLoading />
      </div>
    );
  } else if (!isLoading && isError) {
    content = <ErrorMessage errorMessage={(error as any).message} />;
  } else if (!isLoading && !isError && data?.services?.length === 0) {
    content = <ErrorMessage errorMessage="There is no service available" />;
  } else {
    content = (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {data?.services?.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    );
  }

  return (
    <section className="mt-10 mb-10">
      <div className="container">
        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          <Searchbar
            value={searchTerm}
            changeHandler={(value) => setSearchTerm(value)}
          />
          <div className="w-full flex gap-2 md:justify-end">
            <Select
              options={serviceSorting}
              selectedOption={sorting}
              changeHandler={(option: any) => setSorting(option)}
              placeholder="Sort Order"
            />
            <Select
              options={paginationLimits}
              selectedOption={limit}
              changeHandler={(option: any) => setLimit(option)}
            />
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 md:mt-10 md:gap-10 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-3">
            <div className="w-full px-2 py-2 bg-white rounded-md shadow">
              <div>
                <label htmlFor="minPrice" className="font-normal">
                  Min Price
                </label>
                <input
                  id="minPrice"
                  type="number"
                  className="w-full px-2 py-1.5 rounded-md outline-none bg-gray-100 font-normal"
                  min={0}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="minPrice" className="font-normal">
                  Max Price
                </label>
                <input
                  id="minPrice"
                  type="text"
                  className="w-full px-2 py-1.5 rounded-md outline-none bg-gray-100 font-normal"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-9">{content}</div>
        </div>
        {data?.meta && data?.services.length > 0 && (
          <div className="mt-2 flex justify-end lg:mt-10">
            <Pagination
              limit={Number(data.meta.limit)}
              total={Number(data.meta.total)}
              handlePagination={(value) => setPage(value)}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesPage;
