import UpcomingService from "@/components/home/UpcomingService";
import Header from "@/components/home/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking App | Home",
  description: "",
};

const HomePage = () => {
  return (
    <>
      <Header />
      <UpcomingService />
    </>
  );
};

export default HomePage;
