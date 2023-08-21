'use client';
import { Product } from '@/types/types';
import React, { useEffect, useState } from 'react';

interface Props {
  product: Product;
}

const Price = ({ product }: Props) => {
  console.log('===product==', product);
  const [totalPrice, setTotalPrice] = useState<number>(product.price);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedItem, setselectedItem] = useState(0);
  useEffect(() => {
    if (product.options?.length) {
      setTotalPrice(
        quantity * product.price + product.options[selectedItem].additionalPrice
      );
    }
    setTotalPrice(quantity * product.price);
  }, [quantity, selectedItem, product]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${totalPrice}</h2>
      <div className="flex gap-4">
        {product.options?.length !== 0 &&
          product.options?.map((option, index) => (
            <button
              className="ring-1 ring-red-400 rounded-md p-2 min-w-[6rem] cursor-pointer"
              style={{
                background:
                  selectedItem === index ? 'rgb(248 113 113)' : 'white',
                color: selectedItem === index ? 'white' : 'rgb(248 113 113)',
              }}
              key={option.title}
              onClick={() => setselectedItem(index)}
            >
              {option.title}
            </button>
          ))}
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {'<'}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {'>'}
            </button>
          </div>
        </div>
        <button className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default Price;
