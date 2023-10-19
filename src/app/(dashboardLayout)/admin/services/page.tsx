"use client";

import Pagination from "@/components/UI/Pagination";
import Searchbar from "@/components/UI/Searchbar";
import DeleteButton from "@/components/UI/button/DeleteButton";
import EditButton from "@/components/UI/button/EditButton";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import TableLoader from "@/components/UI/loading/TableLoader";
import Select from "@/components/forms/Select";
import ActionBar from "@/components/shared/ActionBar";
import { paginationLimits, serviceSorting } from "@/constants/pagination";
import useDebounced from "@/hooks/useDebounced";
import { useAppSelector } from "@/redux/app/hooks";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "@/redux/features/service/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useState } from "react";

const ServicePage = () => {
  const query: Record<string, any> = {};
  const [sorting, setSorting] = useState<any>(serviceSorting[1]);
  const [limit, setLimit] = useState<any>(paginationLimits[1]);
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { accessToken } = useAppSelector((state) => state.auth);
  const userInfo: any = accessToken && getUserInfo(accessToken);

  const debouncedSeacrhTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  query["page"] = page;
  query["limit"] = limit.value;
  query["sortOrder"] = sorting.sortOrder;
  query["sortBy"] = sorting.sortBy;

  if (!!debouncedSeacrhTerm) {
    query["searchTerm"] = debouncedSeacrhTerm;
  }

  const { isLoading, isError, error, data } = useGetServicesQuery(query);
  const [deleteService] = useDeleteServiceMutation();

  const deleteHandler = (id: string) => {
    deleteService(id);
  };

  //Decide what to render
  let content = null;
  if (isLoading) {
    content = <TableLoader />;
  } else if (!isLoading && isError) {
    content = <ErrorMessage errorMessage={(error as any).message} />;
  } else if (!isLoading && !isError && data?.services?.length === 0) {
    content = <ErrorMessage errorMessage="There is no service available" />;
  } else {
    content = (
      <div className="mt-5 w-full overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-medium tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Max Size</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.services?.map((service) => (
                <tr className="text-gray-700" key={service.id}>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {service.name}
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {" "}
                    {service.category}
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    {service.location}
                    {/* <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      Acceptable
                    </span> */}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    BDT{service.price}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    {service.maxSize}
                  </td>
                  <td className="px-4 py-3 text-sm border flex gap-x-3">
                    <DeleteButton
                      deleteId={service.id}
                      deleteHandler={(id) => deleteHandler(id)}
                    />
                    <EditButton
                      href={`/${userInfo?.role}/services/update/${service.id}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ActionBar
        text="Service List"
        href={`${userInfo?.role}/services/create`}
      />
      <div className="mt-5 flex flex-col gap-2 md:flex-row md:justify-between">
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
      {content}
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
  );
};

export default ServicePage;
