import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="h-12 md:h-24 p-4 lg:p-20 xl:0:40 text-red-500 flex items-center justify-between">
      <Link href="/" className="font-bold text-lg">
        MASSIMO
      </Link>
      <p>© ALL RIGHTS RESERVED.</p>
    </footer>
  );
};

export default Footer;
