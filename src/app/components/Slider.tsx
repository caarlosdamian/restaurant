'use client';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

const Slider = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        title: 'always fresh & always crispy & always hot',
        image: '/slide1.png',
      },
      {
        id: 2,
        title: 'we deliver your order wherever you are in NY',
        image: '/slide2.png',
      },
      {
        id: 3,
        title: 'the best pizza to share with your family',
        image: '/slide3.jpg',
      },
    ],
    []
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row">
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold">
        <h1 className="text-4xl text-center uppercase p-4 md:text-6xl md:p-10 lg:text-7xl">
          {data[currentSlide].title}
        </h1>
        <button className="bg-red-500 text-white py-4 px-8">Order Now</button>
      </div>
      <div className="flex-1 w-full relative">
        <Image
          className="object-cover"
          src={data[currentSlide].image}
          alt="slider"
          fill
        />
      </div>
    </div>
  );
};

export default Slider;
