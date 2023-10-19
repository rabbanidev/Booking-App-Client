"use client";

import ErrorMessage from "@/components/UI/error/ErrorMessage";
import ServiceForm from "@/components/service/ServiceForm";
import ActionBar from "@/components/shared/ActionBar";
import { useCreateServiceMutation } from "@/redux/features/service/serviceApi";
import { serviceSchema } from "@/schemas/service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreatePage = () => {
  const router = useRouter();
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

  return (
    <div>
      <ActionBar text="Service Create" />
      <ServiceForm
        btnText="Create"
        onSubmit={onSubmit}
        schema={serviceSchema}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      {isError && (
        <ErrorMessage
          errorMessage={(error as any)?.message}
          errorMessages={(error as any).errorMessages}
        />
      )}
    </div>
  );
};

export default CreatePage;
