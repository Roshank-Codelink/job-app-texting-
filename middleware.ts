import { NextResponse } from "next/server";
import { auth } from "@/lib/auth-config";

export default auth((request) => {
  const { pathname, searchParams } = request.nextUrl;

  const token = request.auth?.user?.token as string;
  const role = request.auth?.user?.role as string;
  const onboarding = Boolean(request.auth?.user?.isOnboardingCompleted);

  /* ---------- AUTH PAGES ---------- */
  const employerAuthPages = ["/employer-signin", "/employer-signup"];
  const candidateAuthPages = ["/candidate-signin"];

  const isEmployerAuthPage = employerAuthPages.includes(pathname);
  const isCandidateAuthPage = candidateAuthPages.includes(pathname);

  /* ---------- ADMIN ---------- */
  if (pathname === "/admin-login") {
    if (!token) return NextResponse.next();
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  /* ---------- EMPLOYER AUTH ---------- */
  if (isEmployerAuthPage) {
    if (token && role === "EMPLOYER") {
      return NextResponse.redirect(new URL("/employer/dashboard", request.url));
    }
    return NextResponse.next();
  }

  /* ---------- EMPLOYER ROUTES ---------- */
  if (pathname.startsWith("/employer")) {
    if (!token || role !== "EMPLOYER") {
      return NextResponse.redirect(new URL("/employer-signin", request.url));
    }
  }

  /* ---------- CANDIDATE AUTH ---------- */
  if (isCandidateAuthPage) {
    if (!token) return NextResponse.next();

    if (role === "EMPLOYEE") {
      if (!onboarding) {
        return NextResponse.redirect(
          new URL("/candidate-onboarding", request.url),
        );
      }

      const jobTitle = request.auth?.user?.jobTitle ?? "";
      const url = new URL("/candidate/jobs", request.url);
      if (jobTitle) url.searchParams.set("text", jobTitle);
      return NextResponse.redirect(url);
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  /* ---------- CANDIDATE ROUTES ---------- */
  if (pathname.startsWith("/candidate")) {
    if (!token || role !== "EMPLOYEE") {
      return NextResponse.redirect(new URL("/candidate-signin", request.url));
    }

    if (!onboarding && pathname !== "/candidate-onboarding") {
      return NextResponse.redirect(
        new URL("/candidate-onboarding", request.url),
      );
    }

    if (onboarding && pathname === "/candidate-onboarding") {
      const jobTitle = request.auth?.user?.jobTitle ?? "";
      const url = new URL("/candidate/jobs", request.url);
      if (jobTitle) url.searchParams.set("text", jobTitle);
      return NextResponse.redirect(url);
    }

    if (pathname === "/candidate/jobs") {
      const currentText = searchParams.get("text");
      const jobTitle = request.auth?.user?.jobTitle ?? "";

      if (!currentText && jobTitle) {
        const url = new URL(request.url);
        url.searchParams.set("text", jobTitle);
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
});

export const config = {
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
