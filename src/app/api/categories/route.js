import Category from '@/models/Category';
import connect_db from '@/utils/db';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
  try {
    await connect_db();
    const categories = await Category.find();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    return new NextResponse({}, { status: 500 });
  }
};
