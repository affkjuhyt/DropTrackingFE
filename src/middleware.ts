import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  '/auth/signin',
  '/auth/signup',
  '/api',
  '/_next/static',
  '/_next/image',
  '/favicon.ico'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

  console.log('Current path:', pathname);
  console.log('Token exists:', !!token);
  console.log('Is public route:', isPublicRoute);

  // Cho phép truy cập các route công khai
  if (isPublicRoute) {
    // Nếu đã đăng nhập và cố truy cập trang đăng nhập/đăng ký
    if ((pathname === '/auth/signin' || pathname === '/auth/signup') && token) {
      console.log('Redirecting authenticated user from auth page to home');
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Kiểm tra token cho các route được bảo vệ
  if (!token) {
    console.log('No token found, redirecting to signin');
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  try {
    console.log('Verifying token...');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Token verification status:', response.status);

    if (response.ok) {
      console.log('Token is valid, proceeding...');
      return NextResponse.next();
    }

    console.log('Token is invalid, redirecting to signin');
    const redirectResponse = NextResponse.redirect(new URL('/auth/signin', request.url));
    redirectResponse.cookies.delete('token');
    return redirectResponse;
  } catch (error) {
    console.error('Token verification error:', error);
    const redirectResponse = NextResponse.redirect(new URL('/auth/signin', request.url));
    redirectResponse.cookies.delete('token');
    return redirectResponse;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
