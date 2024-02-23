import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { firebaseConfig } from "./config/firebase";

export const middleware = async (req) => {
  try {
    const cookieSession = cookies().get(firebaseConfig.FIREBASE_COOKIE_NAME)?.value;
    const res = await fetch(`${req.url}api/auth/session`, {
      headers: {
        Cookie: `${firebaseConfig.FIREBASE_COOKIE_NAME}=${cookieSession}`,
      },
    });
    const data = await res.json();
    if (!data.isLogged)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
};

export const config = {
  matcher: ["/:path"],
};
