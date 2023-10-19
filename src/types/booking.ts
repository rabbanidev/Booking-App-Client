import { IService } from ".";
import { IUser } from "./users";

type ICustomer = {
  name: string;
  contactNo: string;
};

export type IBooking = {
  id: string;
  checkIn: string;
  checkOut: string;
  status: string;
  totalPerson: number;
  createdAt: string;
  updatedAt: string;
  customer: ICustomer;
  user: IUser;
  service: IService;
};
