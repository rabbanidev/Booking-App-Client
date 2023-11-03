import UpcomingService from "@/components/home/UpcomingService";
import Header from "@/components/home/Header";
import { Metadata } from "next";
import Overview from "@/components/home/Overview";
import Rating from "@/components/home/Rating";
import News from "@/components/home/News";
import Footer from "@/components/UI/Footer";

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
      <News />
      <Overview />
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
