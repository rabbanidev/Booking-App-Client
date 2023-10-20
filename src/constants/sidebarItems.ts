import {
  BellAlertIcon,
  ClipboardDocumentCheckIcon,
  ListBulletIcon,
  ShoppingBagIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { ENUMS_USER_ROLE } from "./role";

type ISidebarItem = {
  link: string;
  text: string;
  icon?: any;
};

export const sidebarItems = (role: string) => {
  const commoneSidebarItems: ISidebarItem[] = [
    {
      text: "Profile",
      link: `/${role}/profile`,
      icon: UserIcon,
    },
  ];
  const userSidebarItems: ISidebarItem[] = [
    ...commoneSidebarItems,
    {
      text: "Booking History",
      link: `/${role}/booking/history`,
      icon: ClipboardDocumentCheckIcon,
    },
    {
      text: "Notification",
      link: `/${role}/notification`,
      icon: BellAlertIcon,
    },
  ];

  const adminSidebarItems: ISidebarItem[] = [
    ...commoneSidebarItems,
    {
      text: "Users",
      link: `/${role}/users`,
      icon: UsersIcon,
    },
    {
      text: "Service",
      link: `/${role}/services`,
      icon: ListBulletIcon,
    },
    {
      text: "Booking",
      link: `/${role}/bookings`,
      icon: ShoppingBagIcon,
    },
  ];

  const superAdminSidebarItems: ISidebarItem[] = [
    ...commoneSidebarItems,
    {
      text: "Users",
      link: `/${role}/users`,
      icon: UsersIcon,
    },
  ];

  if (role === ENUMS_USER_ROLE.USER) {
    return userSidebarItems;
  } else if (role === ENUMS_USER_ROLE.ADMIN) {
    return adminSidebarItems;
  } else if (role === ENUMS_USER_ROLE.SUPER_ADMIN) {
    return superAdminSidebarItems;
  }
  // else {
  //   return commoneSidebarItems;
  // }
};
