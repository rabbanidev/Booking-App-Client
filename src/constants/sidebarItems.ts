import {
  BellAlertIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
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

  if (role === ENUMS_USER_ROLE.USER) {
    return userSidebarItems;
  } else {
    return commoneSidebarItems;
  }
};
