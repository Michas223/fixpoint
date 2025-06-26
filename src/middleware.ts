"use server";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

const protectedRoutes = ["/dashboard", "/user", "/orders"];
const authRoutes = [
    "/login",
    "/register",
    "/verify",
    "/verify/success",
    "/login/forgot-password",
    "/login/forgot-password/reset-password",
];

export async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const pathname = nextUrl.pathname;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const isOnProtectedRoute = protectedRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    const isOnAuthRoute = authRoutes.includes(pathname);

    if (isOnProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isOnAuthRoute && session) {
        return NextResponse.redirect(new URL("/user", req.url));
    }

    return NextResponse.next();
}

export const config = {
    runtime: "nodejs",
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
