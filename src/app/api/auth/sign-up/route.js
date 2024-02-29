import { runAdminApp } from "@/lib/firebase/firebase-admin";
import { auth } from "firebase-admin";
import { headers } from "next/headers";

runAdminApp()

export const POST = async () => {
  try {
    const uid = headers().get("x-uid");
    const rol = headers().get("x-rol");
    
    auth().setCustomUserClaims(uid, { rol });

    return new Response(JSON.stringify({ message: "Rol asignado" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error" }), {
      status: 500,
    });
  }
};
