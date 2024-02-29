import { NextResponse } from "next/server";
import { firebaseConfig } from "./config/firebase";

export const middleware = async (req) => {
  const { pathname, origin } = req.nextUrl;
  try {
    const cookieSession = req.cookies.get(
      firebaseConfig.FIREBASE_COOKIE_NAME
    )?.value;
    const data = await (
      await fetch(`${origin}/api/auth/session`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: `${firebaseConfig.FIREBASE_COOKIE_NAME}=${cookieSession}`,
        },
      })
    ).json();
    if (!data.isLogged)
      return NextResponse.redirect(new URL("/sign-in", req.url));

    if (
      data.rol === "profesor" &&
      (pathname.startsWith("/dashboard/admin") ||
        pathname.startsWith("/dashboard/alumno"))
    ) {
      return NextResponse.redirect(new URL("/no-autorizado", req.url));
    }

    if (
      data.rol === "alumno" &&
      (pathname.startsWith("/dashboard/admin") ||
        pathname.startsWith("/dashboard/profesor"))
    ) {
      return NextResponse.redirect(new URL("/no-autorizado", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
};

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
