import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log('=== Middleware Start ===');
  const { pathname } = request.nextUrl;
  console.log('Request URL:', request.url);
  const token = request.cookies.get('token')?.value || request.headers.get('Authorization')?.split(' ')[1];

  console.log("token: ", token);
  console.log('Current pathname:', pathname);
  console.log('Token exists:', !!token);

  // Handle signin page access
  if (pathname === '/auth/signin') {
    console.log('Handling signin page access');
    if (!token) {
      console.log('No token found, allowing access to signin page');
      return NextResponse.next();
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Verify response status:', response.status);
      
      if (response.status === 200) {
        console.log('Token verified successfully');
        const redirectUrl = new URL('/', request.url);
        console.log('Redirecting authenticated user to:', redirectUrl.toString());
        const redirectResponse = NextResponse.redirect(redirectUrl);
        redirectResponse.cookies.set('token', token, {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/'
        });
        return redirectResponse;
      }

      console.log('Token verification failed with status:', response.status);
      // If token is invalid, clear it and stay on signin page
      const nextResponse = NextResponse.next();
      nextResponse.cookies.delete('token');
      console.log('Cleared invalid token cookie');
      return nextResponse;
    } catch (error) {
      console.log('Verification error:', error);
      const nextResponse = NextResponse.next();
      nextResponse.cookies.delete('token');
      return nextResponse;
    }
  }

  // Handle protected routes
  console.log('Handling protected route:', pathname);
  if (!token) {
    console.log('No token found, redirecting to signin page');
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!response.ok || response.status === 401) {
        console.log('Token verification failed:', response.status);
        const redirectResponse = NextResponse.redirect(new URL('/auth/signin', request.url));
        redirectResponse.cookies.delete('token');
        console.log('Cleared invalid token and redirecting to signin');
        return redirectResponse;
      }
    
    console.log('Token verified successfully for protected route');
    // Token is valid, proceed with the request
    const nextResponse = NextResponse.next();
    nextResponse.cookies.set('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    return nextResponse;
  } catch (error) {
    console.log('Protected route verification error:', error);
    const redirectResponse = NextResponse.redirect(new URL('/auth/signin', request.url));
    redirectResponse.cookies.delete('token');
    return redirectResponse;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - auth/signin (login page)
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!auth/signin|api|_next/static|_next/image|favicon.ico).*)',
  ],
};
