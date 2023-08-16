'use client';
import React, { useEffect, useState } from 'react';

interface Props {
  options?: { title: string; additionalPrice: number }[];
  id: number;
  price: number;
}

const Price = ({ price, id, options }: Props) => {
  const [totalPrice, setTotalPrice] = useState<number>(price);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedItem, setselectedItem] = useState(0);

  useEffect(() => {
    setTotalPrice(
      quantity *
        (options ? price + options[selectedItem].additionalPrice : price)
    );
  }, [selectedItem, quantity, price, options]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${totalPrice.toFixed(2)}</h2>
      <div className="flex gap-4">
        {options &&
          options.map((option, index) => (
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
