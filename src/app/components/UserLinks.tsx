'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
const user = false;
const UserLinks = () => {
  const { status } = useSession();
  return (
    <div>
      {status === 'authenticated' ? (
        <div className="flex gap-1 cursor-pointer">
          <Link href="/orders">Orders</Link>
          <span onClick={() => signOut()}>Logout</span>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default UserLinks;
