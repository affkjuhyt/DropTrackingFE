import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token') || request.headers.get('Authorization')?.split(' ')[1];
  console.log("token: ", token)
  
  if (!token) {
    console.log("redirect to here")
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  
  try {
    // Verify token with your FastAPI endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!response.ok) {
      throw new Error('Invalid token');
    }
    
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/profile/:path*"],
};