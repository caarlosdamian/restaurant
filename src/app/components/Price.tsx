'use client';
import { Product } from '@/types/types';
import { useCartStore } from '@/utils/store';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  product: Product;
}

const Price = ({ product }: Props) => {
  const [total, setTotal] = useState<number>(product.price);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedItem, setselectedItem] = useState(0);
  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (product.options?.length) {
      setTotal(
        quantity * product.price + product.options[selectedItem].additionalPrice
      );
    }
    setTotal(quantity * product.price);
  }, [quantity, selectedItem, product]);

  const handleCart = () => {
    addToCart({
      id: product.id,
      img: product.img,
      price: product.price,
      quantity: quantity,
      title: product.title,
      ...(product.options?.length && {
        optionTitle: product?.options[selectedItem].title,
      }),
    });
    toast.success('The product added to the cart!');
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total}</h2>
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
        <button
          className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500"
          onClick={handleCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default Price;
