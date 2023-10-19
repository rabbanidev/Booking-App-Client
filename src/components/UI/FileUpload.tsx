"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import ErrorMessage from "./error/ErrorMessage";
import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import { useFormContext, Controller } from "react-hook-form";

interface IProps {
  name: string;
  value?: string | string[] | number | undefined;
  label?: string;
}

const FileUpload = ({ name, value, label }: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  const handleChange = (e: any, callback: any) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "dwjaietb");
    data.append("cloud_name", "dltbpvvvj");

    setLoading(true);
    fetch("https://api.cloudinary.com/v1_1/dltbpvvvj/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data: any) => {
        if (data?.error?.message) {
          setError(data.error?.message);
        } else {
          setImage(data.url);
          callback(data.url);
        }
      })
      .catch((err: any) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="w-full">
          <label className="flex flex-col items-center justify-center w-32 h-auto border-2 rounded-lg">
            {image && (
              <div className="mb-5 bg-white">
                <Image
                  src={image}
                  width={120}
                  height={130}
                  alt="avater"
                  priority
                  className="w-full h-28 rounded-lg"
                />
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center pt-5 pb-6 bg-white w-full rounded-lg">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-7 h-7 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6 bg-white w-full rounded-lg">
                <ArrowUpTrayIcon className="w-7 h-7" />
                <p className="mb-2 text-sm text-gray-500 ">
                  <span className="font-semibold">Upload</span>
                </p>
              </div>
            )}

            <input
              type="file"
              className="hidden"
              onChange={(e) => handleChange(e, field.onChange)}
            />
          </label>
          {error && <ErrorMessage errorMessage={error} />}
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        </div>
      )}
    />
  );
};

export default FileUpload;
