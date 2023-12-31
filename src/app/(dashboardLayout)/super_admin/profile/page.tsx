"use client";

import FileUpload from "@/components/UI/FileUpload";
import SubmitButton from "@/components/UI/button/SubmitButton";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import Form from "@/components/forms/Form";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import { genders } from "@/constants/genders";
import {
  useGetMyInfoQuery,
  useUpdateMyProfileMutation,
} from "@/redux/features/users/usersApi";
import { capitalizeWord } from "@/utils/capitalizeWord";
import moment from "moment";
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

const ProfilePage = () => {
  const { data } = useGetMyInfoQuery(undefined);
  const [updateMyProfile, { isLoading, isError, error }] =
    useUpdateMyProfileMutation();

  console.log("data", data);

  const { name, email, contactNo, profileImage } = data?.user?.superAdmin || {};

  const defaultValues = {
    name: name || "",
    email: email || "",
    contactNo: contactNo || "",
    profileImage: profileImage || null,
  };

  const submitHandler: SubmitHandler<FormValues> = (data: any) => {
    updateMyProfile(data);
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

export default ProfilePage;
