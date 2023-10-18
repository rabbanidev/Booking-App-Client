"use client";
import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import { useFormContext, Controller } from "react-hook-form";
import ErrorMessage from "../UI/error/ErrorMessage";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface IDatePickerProps {
  id?: string;
  name: string;
  value?: Date;
  label?: string;
  placeholder?: string;
  disabled?: any;
  validation?: object;
}

const FormDatePicker = ({
  id,
  name,
  value = new Date(),
  label,
  placeholder,
  disabled,
  validation,
}: IDatePickerProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="w-full block">
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
          <DatePicker
            selected={field.value ? field.value : value}
            minDate={disabled}
            {...field}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full px-2.5 py-2.5"
          />
        )}
      />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default FormDatePicker;
