import { auth } from "firebase-admin";

import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import { runAdminApp } from "@/lib/firebase/firebase-admin";
import { firebaseConfig } from "@/config/firebase";

runAdminApp();

// Obtener una sesión
export const GET = async (req) => {
  try {
    const cookieSession = cookies().get(firebaseConfig.FIREBASE_COOKIE_NAME)?.value;
    await auth().verifySessionCookie(cookieSession, true);
    return NextResponse.json({ isLogged: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { isLogged: false, error: error.message },
      { status: 400 }
    );
  }
};

// Crear una sesión
export const POST = async () => {
  try {
    const idToken = headers().get("Authorization").split("Bearer ")[1];
    const decodedIdToken = await auth().verifyIdToken(idToken);

    if (!(new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60))
      return NextResponse.json(
        { isLogged: false, error: "Token expired" },
        { status: 401 }
      );

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn,
    });

    cookies().set(firebaseConfig.FIREBASE_COOKIE_NAME, sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return NextResponse.json({ isLogged: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { isLogged: false, error: error.message },
      { status: 400 }
    );
  }
};

// Eliminar una sesión
export const DELETE = async () => {
  try {
    const sessionCookie = cookies().get(firebaseConfig.FIREBASE_COOKIE_NAME)?.value;
    cookies().delete(firebaseConfig.FIREBASE_COOKIE_NAME);
    const decodedClaims = await auth().verifySessionCookie(sessionCookie);
    await auth().revokeRefreshTokens(decodedClaims.sub);
    return NextResponse.json({ isLogged: false }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { isLogged: false, error: error.message },
      { status: 400 }
    );
  }
};
