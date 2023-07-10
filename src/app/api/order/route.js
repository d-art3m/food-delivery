import Order from '@/models/Order';
import connect_db from '@/utils/db';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  const { items, name, email, phone, address, status } = await request.json();
  await connect_db();
  const newOrder = new Order({
    items,
    name,
    email,
    phone,
    address,
    status,
  });
  try {
    newOrder.save();
    return new NextResponse('Success!', { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
