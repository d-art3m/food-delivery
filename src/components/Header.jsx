'use client';

import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { signOut, useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';

export default function Header() {
  const session = useSession();
  const quantity = useSelector((state) => state.cart.items.length);

  return (
    <header>
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div>
            <Link className="mr-3 font-bold italic text-2xl" href="/">
              Food Delivery
            </Link>
            <Link className="mr-3" href="/orders">
              Orders
            </Link>
            <Link className="mr-3" href="/cart">
              <span>Cart </span>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </div>
          <div>
            {session?.data ? (
              <div className="border rounded">
                <span className="px-2 italic">{session.data.user.name}</span>
                <Link
                  className="bg-teal-700 px-2"
                  href="#"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Sign Out
                </Link>
              </div>
            ) : (
              <Link href="/signin">Sign In</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
