import Order from '@/models/Order';
import connect_db from '@/utils/db';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
  try {
    await connect_db();
    const { id } = params;
    const order = await Order.findById(id);
    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (err) {
    return new NextResponse({}, { status: 500 });
  }
};
