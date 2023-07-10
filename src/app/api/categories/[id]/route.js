import Product from '@/models/Product';
import connect_db from '@/utils/db';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
  try {
    await connect_db();
    const { id } = params;
    const products = await Product.find({ category: id }).exec();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new NextResponse({}, { status: 500 });
  }
};
