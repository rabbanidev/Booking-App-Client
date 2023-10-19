"use client";

import Sidebar from "@/components/UI/Sidebar";
import SpinarLoader from "@/components/UI/loading/SpinarLoader";
import { authKey } from "@/constants/storageKey";
import useGetLocalStorage from "@/hooks/useGetLocalStorage";
import { useAppSelector } from "@/redux/app/hooks";
import { loggedIn } from "@/redux/features/auth/authSlice";
import { authLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loading } = useGetLocalStorage(authKey, loggedIn);
  const { accessToken } = useAppSelector((state) => state.auth);
  const isUserLoggedIn = authLoggedIn(accessToken as unknown as string);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading, isUserLoggedIn]);

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <header className="header bg-white shadow py-10 px-4"></header>
        <div className="main-content flex flex-col flex-grow p-4">
          <div className="bg-gray-200 rounded-lg p-5 h-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
