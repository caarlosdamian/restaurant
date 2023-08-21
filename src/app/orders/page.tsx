'use client';
import { OrderType } from '@/types/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

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

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  if (isLoading || status === 'loading') return 'Loading....';

  const handleUpdate = (
    event: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const { value } = form.elements[0] as HTMLInputElement;
    mutation.mutate({ id, status: value });
    toast.success('The order status has been change!');
  };

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
            <tr
              className={`"text-sm md:text-base ${
                order.status.toLocaleLowerCase() !== 'delivered' && 'bg-red-50'
              }`}
              key={order.id}
            >
              <td className="hidden md:block py-6 px-1">{order.id}</td>
              <td className="py-6 px-1">
                {order.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1">89.90</td>
              <td className="hidden md:block py-6 px-1">
                {order.products[0].title}
              </td>
              {session?.user.isAdmin ? (
                <td className="py-6 px-1">
                  <form
                    action=""
                    onSubmit={(event) => handleUpdate(event, order.id)}
                    className="flex items-center justify-center gap-4"
                  >
                    <input
                      type="text"
                      name=""
                      placeholder={order.status}
                      id=""
                      className="p-2 ring-1 ring-red-100 rounded-md"
                    />
                    <button className="bg-red-400 p-2 rounded-full">
                      <Image
                        src="/edit.png"
                        height={20}
                        width={20}
                        alt="edit"
                      />
                    </button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{order.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
