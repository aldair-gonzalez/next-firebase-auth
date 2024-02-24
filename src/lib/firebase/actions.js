import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebase";

export const signIn = async (user) => {
  try {
    const userSigned = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const idToken = await userSigned.user.getIdToken();

    await fetch("api/auth/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const signUp = async ({ user, sendEmail, rol }) => {
  try {
    const userCreated = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    await fetch("api/auth/sign-up", {
      method: "POST",
      headers: {
        "x-uid": userCreated.user.uid,
        "x-rol": rol,
      }
    })

    sendEmail && (await sendEmailVerification(userCreated.user));
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await fetch("api/auth/session", { method: "DELETE" });
  } catch (error) {
    throw error;
  }
};

export const verifyEmailAccount = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
