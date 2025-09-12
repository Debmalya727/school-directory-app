// middleware.ts (in the root directory, next to `pages`)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // A more modern, secure JWT library

// You'll need to install jose: npm install jose

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const { pathname } = req.nextUrl;

  if (!token) {
    // If no token, redirect to login page
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the token
    await jwtVerify(token, JWT_SECRET);
    // Token is valid, continue to the requested page
    return NextResponse.next();
  } catch (err) {
    // If token is invalid, redirect to login page
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/addSchool', '/api/addSchool'], // Paths to protect
};