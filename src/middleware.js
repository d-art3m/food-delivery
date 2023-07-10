'use strict';

export { default } from 'next-auth/middleware';

export const config = { matcher: ['/orders', '/orders/:path*'] };
