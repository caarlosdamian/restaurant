'use client';
import { link } from 'fs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import CartIcon from './CartIcon';

const Menu = () => {
  const [isOpen, setisOpen] = useState(false);
  const user = false;
  const links = [
    { id: 1, title: 'HomePage', url: '/' },
    { id: 2, title: 'Menu', url: '/menu' },
    { id: 3, title: 'Working Hours', url: '/' },
    { id: 4, title: 'Contact', url: '/' },
  ];

  const handleOpen = () => {
    setisOpen(!isOpen);
  };

  return (
    <div className="cursor-pointer">
      {isOpen ? (
        <Image
          src="/close.png"
          alt="close"
          width={20}
          height={20}
          onClick={handleOpen}
        />
      ) : (
        <Image
          src="/open.png"
          alt="open"
          width={20}
          height={20}
          onClick={handleOpen}
        />
      )}
      {isOpen && (
        <div className="absolute bg-red-500 text-white left-0 top-24 h-[calc(100vh-6rem)] flex items-center justify-center text-lg flex-col gap-8 w-full z-10">
          {links.map((link) => (
            <Link key={link.id} href={link.url} onClick={handleOpen}>
              {link.title}
            </Link>
          ))}
          {!user ? (
            <Link href="/login" onClick={handleOpen}>
              Login
            </Link>
          ) : (
            <Link href="/orders" onClick={handleOpen}>
              Orders
            </Link>
          )}
          <CartIcon onClick={handleOpen}/>
        </div>
      )}
    </div>
  );
};

export default Menu;
