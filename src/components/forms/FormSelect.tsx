"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Controller, useFormContext } from "react-hook-form";

type SelectOptions = {
  label: string;
  value: string;
};

type IProps = {
  options: SelectOptions[];
  name: string;
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
};

const FormSelect = ({ name, options, placeholder, label }: IProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value: selctedOption, onChange } }) => {
          return (
            <Listbox value={selctedOption} onChange={onChange}>
              <div className="relative mt-1">
                <Listbox.Button className="relative min-w-[250px] w-full cursor-pointer rounded-lg bg-white py-3 px-3 text-left border shadow">
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
    </>
  );
};

export default FormSelect;
