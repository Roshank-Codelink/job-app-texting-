import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const role = (
    (token as any)?.role ||
    (token as any)?.user?.role ||
    ""
  ).toUpperCase();

  const onboarding = Boolean(
    (token as any)?.user?.isOnboardingCompleted
  );

  /* ================= ADMIN ================= */
  if (pathname === "/admin-login") {
    if (!token) return NextResponse.next();
    if (role === "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.url)
      );
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/admin/dashboard")) {
    if (!token || role !== "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin-login", request.url)
      );
    }
  }

  /* ================= EMPLOYER AUTH ================= */
  if (
    pathname === "/employer-signin" ||
    pathname === "/employer-signup"
  ) {
    if (token && role === "EMPLOYER") {
      return NextResponse.redirect(
        new URL("/employer/dashboard", request.url)
      );
    }
    return NextResponse.next();
  }

  /* ================= EMPLOYER DASHBOARD ================= */
  if (pathname.startsWith("/employer/dashboard")) {
    if (!token || role !== "EMPLOYER") {
      return NextResponse.redirect(
        new URL("/employer-signin", request.url)
      );
    }
  }

  /* ================= CANDIDATE AUTH ================= */
  if (pathname === "/candidate-signin") {
    if (!token) return NextResponse.next();

    if (role === "EMPLOYEE") {
      if (!onboarding) {
        return NextResponse.redirect(
          new URL("/candidate-onboarding", request.url)
        );
      }

      const jobTitle = (token as any)?.user?.jobTitle ?? "";
      const url = new URL("/candidate/jobs", request.url);
      if (jobTitle) url.searchParams.set("text", jobTitle);
      return NextResponse.redirect(url);
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  /* ================= CANDIDATE ROUTES ================= */
  if (pathname.startsWith("/candidate")) {
    if (!token || role !== "EMPLOYEE") {
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
      const jobTitle = (token as any)?.user?.jobTitle ?? "";
      const url = new URL("/candidate/jobs", request.url);
      if (jobTitle) url.searchParams.set("text", jobTitle);
      return NextResponse.redirect(url);
    }

    if (pathname === "/candidate/jobs") {
      const currentText = searchParams.get("text");
      const jobTitle = (token as any)?.user?.jobTitle ?? "";

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
