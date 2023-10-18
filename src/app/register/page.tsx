import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking App | Signup",
  description: "",
};

const RegisterPage = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[80vh]">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Register a new account
            </h1>

            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
