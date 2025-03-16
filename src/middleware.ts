import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simplified middleware for demo purposes
// In a real app, you would check for a valid session/auth token
export function middleware(request: NextRequest) {
  // For demonstration purposes only
  // In a real app, you would verify if the user is authenticated
  const isAuthenticated = request.cookies.has('auth-session');
  
  // If trying to access the wallet page but not authenticated
  if (request.nextUrl.pathname.startsWith('/wallet') && !isAuthenticated) {
    // Redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/wallet/:path*'],
}; 