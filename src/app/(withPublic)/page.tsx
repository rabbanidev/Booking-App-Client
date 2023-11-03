import UpcomingService from "@/components/home/UpcomingService";
import Header from "@/components/home/Header";
import { Metadata } from "next";
import Overview from "@/components/home/Overview";
import Rating from "@/components/home/Rating";

export const metadata: Metadata = {
  title: "Booking App | Home",
  description: "",
};

const HomePage = () => {
  return (
    <>
      <Header />
      <UpcomingService />
      <Rating />
      {/* <Overview /> */}
      <div className="mb-10"></div>
    </>
  );
};

export default HomePage;
