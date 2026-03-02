import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const role = ((token as any)?.role || (token as any)?.user?.role || "").toUpperCase();
  const onboarding = Boolean((token as any)?.user?.isOnboardingCompleted);
  const publicPaths = [
    "/",
    "/employer-hub",
    "/candidate/jobs",
    "/candidate-signin",
    "/employer-signin",
    "/employer-signup",
    "/admin-login"
  ];

  if (publicPaths.includes(pathname) || pathname.startsWith("/employer-hub")) {
    if (token) {
      if (role === "EMPLOYER") {
        return NextResponse.redirect(new URL("/employer/dashboard", request.url));
      }
      if (pathname === "/candidate-signin" && role === "EMPLOYEE") {
        return NextResponse.redirect(new URL(onboarding ? "/candidate/jobs" : "/candidate-onboarding", request.url));
      }
      if (pathname === "/admin-login" && role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!token || role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }
  if (pathname.startsWith("/employer")) {
    if (!token || role !== "EMPLOYER") {
      return NextResponse.redirect(new URL("/employer-signin", request.url));
    }
  }
  if (pathname.startsWith("/candidate") || pathname === "/candidate-onboarding") {
    if (!token || role !== "EMPLOYEE") {
      return NextResponse.redirect(new URL("/candidate-signin", request.url));
    }

    if (!onboarding && pathname !== "/candidate-onboarding") {
      return NextResponse.redirect(new URL("/candidate-onboarding", request.url));
    }
    if (onboarding && pathname === "/candidate-onboarding") {
      return NextResponse.redirect(new URL("/candidate/jobs", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/employer-hub/:path*",
    "/admin-login",
    "/admin/dashboard/:path*",
    "/employer/dashboard/:path*",
    "/employer-signin",
    "/employer-signup",
    "/candidate/:path*",
    "/candidate-signin",
    "/candidate-onboarding",
  ],
};