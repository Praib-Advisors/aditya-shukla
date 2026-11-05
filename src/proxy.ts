import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * The site is English only: bare paths and the old /hi paths are sent to the same page under /en. Professional
 * Journey is now the lower half of the About page, so its old address (under any prefix) goes there.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (/^(\/en|\/hi)?\/professional-journey\/?$/.test(pathname)) {
    url.pathname = "/en/about";
    url.hash = "journey";
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) return;

  const rest = pathname.replace(/^\/hi(?=\/|$)/, "");
  url.pathname = `/en${rest === "/" ? "" : rest}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension (photos, icons, robots, sitemap).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
