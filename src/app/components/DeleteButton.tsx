'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function DeleteButton({ id }: { id: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading....</p>;
  }
  if (status === 'unauthenticated' || !session?.user.isAdmin) {
    return <p>Loading....</p>;
  }

  const handleDelete = async () => {
    const rest = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE',
    });
    if (rest.status === 200) {
      router.push('/menu');
      toast.info('produc has been deleted');
    } else {
      const data = await rest.json();
      toast.error(data.message);
    }
  };

  return (
    <button
      className="bg-red-400 rounded-full p-2 absolute top-4 right-4"
      onClick={handleDelete}
    >
      <Image src="/delete.png" alt="delete" width={20} height={20} />
    </button>
  );
}

export default DeleteButton;
