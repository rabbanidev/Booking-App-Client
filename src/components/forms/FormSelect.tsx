"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Controller, useFormContext } from "react-hook-form";
import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import ErrorMessage from "../UI/error/ErrorMessage";

type SelectOptions = {
  label: string | number;
  value: string | number;
};

type IProps = {
  options: SelectOptions[];
  name: string;
  value?: any;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
};

const FormSelect = ({ name, options, placeholder, label }: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, `${name}.value`);

  return (
    <div className="w-full">
      {label ? (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value: selctedOption, onChange } }) => {
          return (
            <Listbox value={selctedOption} onChange={onChange}>
              <div className="relative mt-1">
                <Listbox.Button
                  className={`relative min-w-[250px] w-full cursor-pointer rounded-lg border-gray-300 px-3 text-left border shadow ${
                    selctedOption?.label || placeholder ? "py-3" : "py-5"
                  }`}
                >
                  <span className="block truncate">
                    {selctedOption ? selctedOption.label : placeholder}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
                    {options.map((option: any) => (
                      <Listbox.Option
                        key={option.label}
                        value={option}
                        className="relative cursor-pointer select-none py-2 px-3 hover:bg-gray-100"
                      >
                        <>
                          <span className="block truncate font-normal">
                            {option.label}
                          </span>
                          {selctedOption?.value === option.value && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          );
        }}
      />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default FormSelect;
