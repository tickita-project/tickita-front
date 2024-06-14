import { NextRequest, NextResponse } from "next/server";

import { PAGE_PATH } from "./constants/pagePath";

export const middleware = (request: NextRequest) => {
  const REFRESH_TOKEN = request.cookies.get("REFRESH_TOKEN");

  if (!REFRESH_TOKEN) {
    return NextResponse.redirect(new URL(PAGE_PATH.SIGN_IN, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/calendar/:path*", "/group/:path*"],
};
