import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // "jose" works on Edge Runtime

// This will run on Edge Runtime

const PUBLIC_FILE = /\.(.*)$/;

const verifyJWT = async (jwt: string) => {
  // Re-declaring this here since the other in lib/auth is in a file which imports bcryot and bcrypt is not supported on Edge Runtime env.
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};

export default async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/auth") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const cookieName = process.env.COOKIE_NAME;
  console.log("Middleware: cookieName", cookieName);

  if (!cookieName) {
    req.nextUrl.pathname = "/auth";
    return NextResponse.redirect(req.nextUrl);
  }

  const jwt = req.cookies.get(cookieName);

  if (!jwt) {
    req.nextUrl.pathname = "/auth";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e: any) {
    console.error(e);
    req.nextUrl.pathname = "/auth";
    return NextResponse.redirect(req.nextUrl);
  }
}
