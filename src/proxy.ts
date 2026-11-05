import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * The site is English only and its addresses carry no language prefix ("/about", not "/en/about").
 * - Old addresses are sent to the clean one: "/en/about" and "/hi/about" become "/about" (permanent redirect).
 *   Professional Journey is now the lower half of the About page, so its old address goes to "/about#journey".
 * - Clean addresses are rewritten internally to the pages that live under app/[lang]/ ("/about" is served from
 *   "/en/about"), so the visitor's address bar never shows "/en".
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (/^(\/en|\/hi)?\/professional-journey\/?$/.test(pathname)) {
    url.pathname = "/about";
    url.hash = "journey";
    return NextResponse.redirect(url, 308);
  }

  const prefixed = pathname.match(/^\/(?:en|hi)(\/.*)?$/);
  if (prefixed) {
    url.pathname = prefixed[1] && prefixed[1] !== "/" ? prefixed[1] : "/";
    return NextResponse.redirect(url, 308);
  }

  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension (photos, icons, robots, sitemap).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
