"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type SelectOptions = {
  label: string | number;
  value: string | number;
};

type IProps = {
  options: SelectOptions[];
  selectedOption: any;
  changeHandler: (option: any) => void;
  placeholder?: string;
};

const Select = ({
  options,
  selectedOption,
  changeHandler,
  placeholder,
}: IProps) => {
  return (
    <div className="w-full md:max-w-xs">
      <Listbox value={selectedOption} onChange={changeHandler}>
        <div className="relative mt-1 z-40">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 px-3 text-left border shadow">
            <span className="block truncate">
              {selectedOption ? selectedOption.label : placeholder}
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
                    {selectedOption?.label === option.label && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
