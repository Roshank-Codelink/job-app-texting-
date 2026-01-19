import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* ---------- ROUTES ---------- */
  const employerRoutes = pathname.startsWith("/employer");
  const candidateRoutes = pathname.startsWith("/candidate");

  const authPages = [
    "/employer-signin",
    "/employer-signup",
    "/candidate-signin",
    "/candidate-signup",
  ];

  const isAuthPage = authPages.includes(pathname);

  /* ---------- TOKEN ---------- */
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Get role from token - check both token.role and token.user.role
  const role = token?.role || (token as any)?.user?.role;

  /* ==================================================
     1️⃣ AUTH PAGES (LOGIN / SIGNUP)
     ================================================== */
  if (isAuthPage) {
    // ❗ IMPORTANT: No token → allow signin/signup
    if (!token) {
      return NextResponse.next();
    }

    // Check which auth page user is trying to access
    const isEmployerAuthPage = pathname === "/employer-signin" || pathname === "/employer-signup";
    const isCandidateAuthPage = pathname === "/candidate-signin" || pathname === "/candidate-signup";

    // If EMPLOYER is logged in
    if (role === "EMPLOYER") {
      // If trying to access employer auth pages → redirect to dashboard
      if (isEmployerAuthPage) {
        return NextResponse.redirect(new URL("/employer/dashboard", request.url));
      }
      // If trying to access candidate auth pages → redirect to dashboard (block access)
      if (isCandidateAuthPage) {
        return NextResponse.redirect(new URL("/employer/dashboard", request.url));
      }
    }

    // If EMPLOYEE is logged in
    if (role === "EMPLOYEE") {
      // If trying to access candidate auth pages → redirect to dashboard
      if (isCandidateAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      // If trying to access employer auth pages → redirect to dashboard (block access)
      if (isEmployerAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  }

  /* ==================================================
     2️⃣ PROTECTED EMPLOYER ROUTES
     ================================================== */
  if (employerRoutes) {
    if (!token || role !== "EMPLOYER") {
      return NextResponse.redirect(new URL("/employer-signin", request.url));
    }
  }

  /* ==================================================
     3️⃣ PROTECTED CANDIDATE ROUTES
     ================================================== */
  if (candidateRoutes) {
    if (!token || role !== "EMPLOYEE") {
      return NextResponse.redirect(new URL("/candidate-signin", request.url));
    }

    // 🔥 URL GUARD for candidate routes that need text parameter
    const routesNeedingText = ["/candidate/jobs"];
    
    if (routesNeedingText.includes(pathname)) {
      const { searchParams } = request.nextUrl;
      const currentText = searchParams.get("text");
      
      // Get jobTitle from token
      const jobTitle = (token as any)?.user?.jobTitle ?? "";
      
      // If no text parameter, add it automatically
      if (!currentText && jobTitle) {
        const url = new URL(pathname, request.url);
        // Add text parameter without URL encoding
        url.searchParams.set("text", encodeURIComponent(jobTitle));
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/employer/:path*",
    "/candidate/:path*",
    "/employer-signin",
    "/employer-signup",
    "/candidate-signin",
    "/candidate-signup",
    "/profile",
  ],
};
