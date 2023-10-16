import ServiceCard from "@/components/UI/card/ServiceCard";
import Header from "@/components/home/Header";

const HomePage = () => {
  return (
    <>
      <Header />
      <section className="mt-10 mb-10">
        <div className="container">
          <span className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm px-2 py-1 text-center italic">
            Explore
          </span>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Available <span className="text-red-600">Services</span>
          </h3>
          <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
