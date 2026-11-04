import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** The site is English only: bare paths and the old /hi paths are sent to the same page under /en. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/en" || pathname.startsWith("/en/")) return;

  const rest = pathname.replace(/^\/hi(?=\/|$)/, "");
  const url = request.nextUrl.clone();
  url.pathname = `/en${rest === "/" ? "" : rest}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension (photos, icons, robots, sitemap).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
