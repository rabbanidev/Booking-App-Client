"use client";

import FileUpload from "@/components/UI/FileUpload";
import SubmitButton from "@/components/UI/button/SubmitButton";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import Form from "@/components/forms/Form";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import { genders } from "@/constants/genders";
import { ENUMS_USER_ROLE } from "@/constants/role";
import {
  useGetSingleUserQuery,
  useUpdateUserByAuthorityMutation,
} from "@/redux/features/users/usersApi";
import { capitalizeWord } from "@/utils/capitalizeWord";
import moment from "moment";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  name: { firstName: string; lastName: string };
  email: string;
  contactNo: string;
  dob?: string;
  gender?: { label: string; value: string };
  image?: string;
};

const UserUpdatePage = ({ params }: { params: any }) => {
  const { data } = useGetSingleUserQuery(params.id);
  const [updateUserByAuthority, { isLoading, isError, error, isSuccess }] =
    useUpdateUserByAuthorityMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("User updated successfully!");
    }
  }, [isSuccess]);

  const { name, email, contactNo, dob, gender, profileImage } =
    data?.user?.user || {};

  const defaultValues = {
    name: name || "",
    email: email || "",
    contactNo: contactNo || "",
    dob: dob ? new Date(dob) : "",
    gender: {
      label: gender ? capitalizeWord(gender) : "",
      value: gender || "",
    },
    role: {
      label: data?.user?.role || "",
      value: data?.user?.role || "",
    },
    profileImage: profileImage || null,
  };

  const submitHandler: SubmitHandler<FormValues> = (data: any) => {
    const payload = {
      ...data,
      gender: data.gender.value,
      dob: moment(data.dob).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    };
    updateUserByAuthority({ id: params.id, data: payload });
  };

  return (
    <Form submitHandler={submitHandler} defaultValues={defaultValues}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        <FormInput
          name="name.firstName"
          type="text"
          placeholder=""
          label="First Name"
        />
        <FormInput
          name="name.lastName"
          type="text"
          placeholder=""
          label="Last Name"
        />
        <FormInput name="email" type="email" placeholder="" label="Email" />
        <FormInput
          name="contactNo"
          type="text"
          placeholder=""
          label="Contact No"
        />
        <FormDatePicker name="dob" label="DOB" disabled={moment().toDate} />
        <FormSelect name="gender" label="Gender" options={genders} />

        <FileUpload
          name="profileImage"
          value={defaultValues?.profileImage ? defaultValues.profileImage : ""}
        />
      </div>
      <SubmitButton text="Update" loading={isLoading} />

      {isError && <ErrorMessage errorMessage={(error as any)?.message} />}
    </Form>
  );
};

export default UserUpdatePage;
