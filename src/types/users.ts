import { ENUMS_USER_ROLE } from "@/constants/role";
import { IGender } from "./genders";

type IName = {
  firstName: string;
  lastName: string;
};

export type ISuperAdmin = {
  name: IName;
  email: string;
  contactNo?: string;
  profileImage?: string;
  id: string;
};

export type IAdmin = {
  name: IName;
  email: string;
  contactNo: string;
  dob?: string;
  gender?: IGender;
  profileImage?: string;
  id: string;
};

export type IUser = {
  user: any;
  name: IName;
  email: string;
  contactNo: string;
  dob?: string;
  gender?: IGender;
  profileImage?: string;
  active?: boolean;
  id: string;
};

export type IUsers = {
  id: string;
  email: string;
  role:
    | ENUMS_USER_ROLE.SUPER_ADMIN
    | ENUMS_USER_ROLE.ADMIN
    | ENUMS_USER_ROLE.USER;
  superAdmin?: ISuperAdmin;
  admin?: IAdmin;
  user?: IUser;
};
