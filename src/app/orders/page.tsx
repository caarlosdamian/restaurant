'use client';
import { OrderType } from '@/types/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQuery } from 'react-query';

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push('/');
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      fetch('http://localhost:3000/api/orders').then((res) => res.json()),
  });

  if (isLoading || status === 'loading') return 'Loading....';
  
  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order: OrderType) => (
            <tr className="text-sm md:text-base  bg-red-50" key={order.id}>
              <td className="hidden md:block py-6 px-1">{order.id}</td>
              <td className="py-6 px-1">{order.createdAt.toString()}</td>
              <td className="py-6 px-1">89.90</td>
              <td className="hidden md:block py-6 px-1">
                Big Burger Menu (2) Beggie Pizza (2) , Coca Cola 1L (2)
              </td>
              <td className="py-6 px-1">On the way (Approx. 10min)</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
