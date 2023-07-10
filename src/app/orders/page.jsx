import Link from 'next/link';
import Order from '@/models/Order';
import connect_db from '@/utils/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

async function getData() {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      await connect_db();
      const orders = await Order.find({ email: session.user.email });
      const response = new NextResponse(JSON.stringify(orders), {
        status: 200,
      });
      return response.json({ revalidated: true, now: Date.now() });
    }
  } catch (err) {
    return null;
  }
}

export default async function Orders() {
  const data = await getData();

  if (data === null)
    return <div className="text-center text-4xl m-3">Error loading data!</div>;

  if (!data.length)
    return <div className="text-center text-4xl m-3">No orders</div>;

  return (
    <>
      <div className="mt-3 text-center text-4xl">Orders ({data.length}):</div>
      <div className="flex flex-col items-center m-3">
        {data.map((item) => (
          <Link
            key={item._id}
            className="border rounded-md mt-3 p-5 w-full md:w-3/5 text-2xl text-center bg-teal-700"
            href={`/orders/${item._id}`}
          >
            Order #{item._id}
          </Link>
        ))}
      </div>
    </>
  );
}
