import Image from 'next/image';
import React from 'react';
import CountDown from './CountDown';

const Offer = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh] ">
      <div className="flex-1 flex items-center justify-center flex-col text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">
          Delicius Burger & French Fry
        </h1>
        <p className="text-white xl:text-xl">
          Progressively simplify effective e-toiler and process-centric methods
          of empowerment. Quickly pontificate parallel.
        </p>
        <CountDown />
        <button className="text-white bg-red-500 rounded-md py-3 px-6">
          Order Now
        </button>
      </div>
      <div className="relative w-full flex-1 md:h-full">
        <Image
          src="/offerProduct.png"
          alt="ofert"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Offer;
