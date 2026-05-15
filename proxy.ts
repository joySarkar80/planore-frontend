import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserFromToken } from "./services/auth";

const ALLOWED_ROLE = ["USER", "ADMIN"];
const PUBLIC_ROUTE = ["/login", "/register"];

export async function proxy(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;
    const user = await getUserFromToken();

    if (PUBLIC_ROUTE.includes(pathname)) {
        return NextResponse.next();
    }

    if (!user) {
        return NextResponse.redirect(
            new URL(`/login?redirect=${pathname}`, origin)
        );
    }

    if (!ALLOWED_ROLE.includes(user.role)) {
        return NextResponse.redirect(
            new URL(`/login?redirect=${pathname}`, origin)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};
