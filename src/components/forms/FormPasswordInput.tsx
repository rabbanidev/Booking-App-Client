"use client";
import { useState } from "react";
import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import { useFormContext, Controller } from "react-hook-form";
import ErrorMessage from "../UI/error/ErrorMessage";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface IInput {
  id?: string;
  name: string;
  value?: string | string[] | number | undefined;
  label?: string;
  placeholder?: string;
  validation?: object;
}

const FormPasswordInput = ({
  id,
  name,
  value,
  label,
  placeholder,
  validation,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [type, setType] = useState<boolean>(true);

  const toggleType = () => {
    setType(!type);
  };

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={id || name}
          className="block mb-1 text-sm font-medium text-gray-900"
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
              type={type ? "password" : "text"}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full px-2.5 py-2.5"
              placeholder={placeholder}
              {...field}
              value={(value ? value : field.value) || ""}
            />
            <button
              type="button"
              className="cursor-pointer absolute top-3 right-4"
              onClick={toggleType}
            >
              {type ? (
                <EyeSlashIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default FormPasswordInput;
