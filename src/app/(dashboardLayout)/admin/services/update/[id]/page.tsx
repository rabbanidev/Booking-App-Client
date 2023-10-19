"use client";

import ErrorMessage from "@/components/UI/error/ErrorMessage";
import SpinarLoader from "@/components/UI/loading/SpinarLoader";
import ServiceForm from "@/components/service/ServiceForm";
import ActionBar from "@/components/shared/ActionBar";
import {
  useCreateServiceMutation,
  useGetServiceQuery,
} from "@/redux/features/service/serviceApi";
import { serviceSchema } from "@/schemas/service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type IDefaulProps = {
  params: any;
};

const UpdateServicePage = ({ params }: IDefaulProps) => {
  const router = useRouter();
  const {
    isLoading: dataIsLoading,
    isError: dataIsError,
    error: dataError,
    data,
  } = useGetServiceQuery(params.id);

  const [createService, { isLoading, isError, error, isSuccess }] =
    useCreateServiceMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push("/admin/services");
    }
  }, [isSuccess, router]);

  const onSubmit = (data: any) => {
    createService(data);
  };

  let content;
  if (dataIsLoading) {
    content = <SpinarLoader />;
  } else if (dataIsError) {
    content = <ErrorMessage errorMessage={(dataError as any)?.message} />;
  } else if (data?.service) {
    content = (
      <ServiceForm
        btnText="Update"
        onSubmit={onSubmit}
        schema={serviceSchema}
        isLoading={isLoading}
        isSuccess={isSuccess}
        defaultValues={data.service}
      />
    );
  }

  return (
    <div>
      <ActionBar text="Service Update" href="" />
      {content}
      {isError && (
        <ErrorMessage
          errorMessage={(error as any)?.message}
          errorMessages={(error as any).errorMessages}
        />
      )}
    </div>
  );
};

export default UpdateServicePage;
