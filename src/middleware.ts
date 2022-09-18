import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.SECRET,
  });

  //console.log(session)

  if (pathname.startsWith("/_next")) return NextResponse.next();

  if (session) {
    if (pathname === "/") {
      req.nextUrl.pathname = "/Dashboard";
      return NextResponse.redirect(req.nextUrl);
    }
    return NextResponse.next();
  } else {
    if (pathname != "/") {
      req.nextUrl.pathname = "/";
      //return NextResponse.redirect(req.nextUrl);
    }
    return NextResponse.next();
  }
}
