import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/login": true,
  "/create-account": true,
};

const protectedRoute: Routes = {
  "/": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;
  const isPublicOnly = publicOnlyUrls[pathname];
  const isProtected = protectedRoute[pathname];
  if (!session.id) {
    // 로그인하지 않은 사용자가 보호된 페이지 접근 시 로그인 페이지로 이동
    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // 로그인한 사용자가 publicOnlyUrls에 있는 페이지(예: /login, /create-account)에 접근하면 홈으로 리디렉션
    if (isPublicOnly) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
