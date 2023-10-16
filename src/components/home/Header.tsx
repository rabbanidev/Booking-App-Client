import React from "react";

const Header = () => {
  return (
    <div
      className="relative h-[88vh] w-full flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/cover.jpg')`,
      }}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-700 opacity-75"></div>

      <div className="px-4 sm:px-6 lg:px-8 z-10">
        <div className="px-5 text-center">
          <h2 className="text-4xl tracking-tight leading-10 font-semibold sm:text-4xl text-white sm:leading-none md:text-6xl">
            Book The Best Hotel,
            <br /> For Your Vacation
          </h2>

          <div className="mt-5 sm:mt-8 sm:flex justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
