export type IService = {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  maxSize: number;
  description: string;
  image: string;
  isUpcoming: boolean;
  facilities?: string[];
  rating?: number;
  numOfReviews?: number;
  createdAt: string;
  updatedAt: string;
};
