import { IService } from ".";
import { IUsers } from "./users";

export type IReview = {
  id: string;
  user: IUsers;
  service: IService;
  rating: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};
