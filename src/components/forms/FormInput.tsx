"use client";
import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import { useFormContext, Controller } from "react-hook-form";
import ErrorMessage from "../UI/error/ErrorMessage";

interface IInput {
  id?: string;
  name: string;
  type: string;
  value?: string | string[] | number | undefined;
  label?: string;
  placeholder?: string;
  validation?: object;
}

const FormInput = ({
  id,
  name,
  type,
  value,
  label,
  placeholder,
  validation,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={id || name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="relative">
            <input
              id={id || name}
              type={type}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full px-2.5 py-2.5"
              placeholder={placeholder}
              {...field}
              value={(value ? value : field.value) || ""}
            />
          </div>
        )}
      />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default FormInput;
