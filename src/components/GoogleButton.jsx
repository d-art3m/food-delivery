'use client';

import { signIn } from 'next-auth/react';

export default function GoogleButton() {
  return (
    <button
      className="border rounded p-2 bg-teal-700"
      onClick={() => signIn('google', { callbackUrl: '/' })}
    >
      Sign in with Google
    </button>
  );
}
