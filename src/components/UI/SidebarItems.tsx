"use client";

import { sidebarItems } from "@/constants/sidebarItems";
import { useAppSelector } from "@/redux/app/hooks";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItems = () => {
  const pathname = usePathname();
  const { accessToken } = useAppSelector((state) => state.auth);
  const userInfo: any = accessToken && getUserInfo(accessToken);

  const items = sidebarItems(userInfo?.role);

  return (
    items?.length > 0 &&
    items?.map((item, i) => (
      <div className="my-px" key={i}>
        <Link
          href={item.link}
          className={`flex flex-row items-center h-10 px-3 rounded-lg hover:bg-gray-100 hover:text-gray-700 ${
            pathname === item.link ? "bg-gray-100 text-gray-700" : "text-white"
          }`}
        >
          <item.icon className="h-5 w-5" />
          <span className="ml-3 mt-1">{item.text}</span>
        </Link>
      </div>
    ))
  );
};

export default SidebarItems;
