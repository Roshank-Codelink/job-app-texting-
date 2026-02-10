import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth-config"; 

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const session = await auth();
  const user = session?.user;

  const role = (user?.role || "").toUpperCase();
  const onboarding = Boolean(user?.isOnboardingCompleted);

  /* ================= ADMIN LOGIN ================= */
  if (pathname === "/admin-login") {
    if (!session) return NextResponse.next();

    if (role === "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.url)
      );
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  /* ================= ADMIN ROUTES ================= */
  if (pathname.startsWith("/admin/dashboard")) {
    if (!session || role !== "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin-login", request.url)
      );
    }
  }

  /* ================= EMPLOYER AUTH PAGES ================= */
  if (
    pathname === "/employer-signin" ||
    pathname === "/employer-signup"
  ) {
    if (session && role === "EMPLOYER") {
      return NextResponse.redirect(
        new URL("/employer/dashboard", request.url)
      );
    }
    return NextResponse.next();
  }

  /* ================= EMPLOYER DASHBOARD ================= */
  if (pathname.startsWith("/employer/dashboard")) {
    if (!session || role !== "EMPLOYER") {
      return NextResponse.redirect(
        new URL("/employer-signin", request.url)
      );
    }
  }

  /* ================= CANDIDATE AUTH ================= */
  if (pathname === "/candidate-signin") {
    if (!session) return NextResponse.next();

    if (role === "EMPLOYEE") {
      if (!onboarding) {
        return NextResponse.redirect(
          new URL("/candidate-onboarding", request.url)
        );
      }

      const jobTitle = user?.jobTitle ?? "";
      const url = new URL("/candidate/jobs", request.url);
      if (jobTitle) url.searchParams.set("text", jobTitle);
      return NextResponse.redirect(url);
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  /* ================= CANDIDATE ROUTES ================= */
  if (pathname.startsWith("/candidate")) {
    if (!session || role !== "EMPLOYEE") {
      return NextResponse.redirect(
        new URL("/candidate-signin", request.url)
      );
    }

    if (!onboarding && pathname !== "/candidate-onboarding") {
      return NextResponse.redirect(
        new URL("/candidate-onboarding", request.url)
      );
    }

    if (onboarding && pathname === "/candidate-onboarding") {
      const jobTitle = user?.jobTitle ?? "";
      const url = new URL("/candidate/jobs", request.url);
      if (jobTitle) url.searchParams.set("text", jobTitle);
      return NextResponse.redirect(url);
    }

    if (pathname === "/candidate/jobs") {
      const currentText = searchParams.get("text");
      const jobTitle = user?.jobTitle ?? "";

      if (!currentText && jobTitle) {
        const url = new URL(request.url);
        url.searchParams.set("text", jobTitle);
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

/* ================= MATCHER ================= */
export const config = {
  matcher: [
    "/admin/:path*",
    "/admin-login",
    "/employer/dashboard/:path*",
    "/employer-signin",
    "/employer-signup",
    "/candidate/:path*",
    "/candidate-signin",
    "/candidate-onboarding",
  ],
};
