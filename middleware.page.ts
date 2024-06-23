import { NextRequest, NextResponse } from "next/server";

import { PAGE_PATH } from "./constants/pagePath";

export const middleware = (request: NextRequest) => {
  const REFRESH_TOKEN = request.cookies.get("REFRESH_TOKEN");

  if (!REFRESH_TOKEN) {
    return NextResponse.redirect(new URL(PAGE_PATH.SIGN_IN, request.url));
  }

  if (REFRESH_TOKEN && request.nextUrl.pathname.startsWith(PAGE_PATH.SIGN_IN)) {
    return NextResponse.redirect(new URL(PAGE_PATH.DASHBOARD, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!sign-in/.*$).*)"], // "sign-in/kakao"처럼 sign-in 뒤에 path 붙는 경로 제외
};
