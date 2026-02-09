import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  /* ---------- AUTH PAGES ---------- */
  const employerAuthPages = ["/employer-signin", "/employer-signup"];
  const candidateAuthPages = ["/candidate-signin"];

  const isEmployerAuthPage = employerAuthPages.includes(pathname);
  const isCandidateAuthPage = candidateAuthPages.includes(pathname);

  /* ---------- ADMIN PAGES ---------- */
  const isAdminAuthPage = pathname === "/admin-login";
  const isAdminRoute = pathname.startsWith("/admin");

  /* ---------- TOKEN ---------- */
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const role = token?.role || (token as any)?.user?.role;
  const onboarding = Boolean((token as any)?.user?.isOnboardingCompleted);

  /* ==================================================
     ADMIN LOGIN PAGE
     ================================================== */
  if (isAdminAuthPage) {
    // Not logged in → allow
    if (!token) {
      return NextResponse.next();
    }

    // Logged in ADMIN → dashboard
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // Logged in but not admin → block
    return NextResponse.redirect(new URL("/", request.url));
  }

  /* ==================================================
     ADMIN ROUTES
     ================================================== */
  if (isAdminRoute) {
    // Not logged in → admin-login
    if (!token) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }

    // Logged in but NOT admin
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  /* ==================================================
     EMPLOYER AUTH PAGES
     ================================================== */
  if (isEmployerAuthPage) {
    if (token && role === "EMPLOYER") {
      return NextResponse.redirect(new URL("/employer/dashboard", request.url));
    }
    return NextResponse.next();
  }

  /* ==================================================
     CANDIDATE AUTH PAGE (SIGNIN)
     ================================================== */
  if (isCandidateAuthPage) {
    if (!token) {
      return NextResponse.next();
    }

    if (role === "EMPLOYEE") {
      if (!onboarding) {
        return NextResponse.redirect(
          new URL("/candidate-onboarding", request.url),
        );
      }

      const jobTitle = (token as any)?.user?.jobTitle ?? "";
      const url = new URL("/candidate/jobs", request.url);
      if (jobTitle) {
        url.searchParams.set("text", jobTitle);
      }
      return NextResponse.redirect(url);
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  /* ==================================================
     EMPLOYER ROUTES
     ================================================== */
  if (pathname.startsWith("/employer")) {
    if (!token || role !== "EMPLOYER") {
      return NextResponse.redirect(new URL("/employer-signin", request.url));
    }
  }

  /* ==================================================
     CANDIDATE ROUTES
     ================================================== */
  if (pathname.startsWith("/candidate")) {
    if (!token || role !== "EMPLOYEE") {
      return NextResponse.redirect(new URL("/candidate-signin", request.url));
    }

    // onboarding NOT completed → only onboarding allowed
    if (!onboarding && pathname !== "/candidate-onboarding") {
      return NextResponse.redirect(
        new URL("/candidate-onboarding", request.url),
      );
    }

    // onboarding completed → block onboarding page
    if (onboarding && pathname === "/candidate-onboarding") {
      const jobTitle = (token as any)?.user?.jobTitle ?? "";
      const url = new URL("/candidate/jobs", request.url);
      if (jobTitle) {
        url.searchParams.set("text", jobTitle);
      }
      return NextResponse.redirect(url);
    }

    // auto add text param on jobs page
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

/* ==================================================
   MATCHER
   ================================================== */
export const config = {
  runtime: "nodejs",
  matcher: [
    "/admin/:path*",
    "/admin-login",
    "/employer/:path*",
    "/candidate/:path*",
    "/employer-signin",
    "/employer-signup",
    "/candidate-signin",
    "/candidate-onboarding",
  ],
};
