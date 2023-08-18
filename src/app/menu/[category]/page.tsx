import { pizzas } from '@/data';
import { Product } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  params: { category: string };
};

const getData = async (category: string) => {
  const res = await fetch(
    `http://localhost:3000/api/products?cat=${category}`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

const CategoryPage = async ({ params }: Props) => {
  const { category } = params;
  const products: Product[] = await getData(category);
  return (
    <div className="flex flex-wrap text-red-500">
      {products.map((item: Product) => (
        <Link
          key={item.id}
          href={`/product/${item.id}`}
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group cursor-pointer even:bg-fuchsia-50"
        >
          {item.img && (
            <div className="relative h-[80%]">
              <Image
                src={item.img}
                alt={item.id.toString()}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2 ">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button className="hidden  group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
