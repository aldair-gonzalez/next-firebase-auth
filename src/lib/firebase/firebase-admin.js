import { cert, getApps, initializeApp } from "firebase-admin/app";

import { firebaseConfig } from "@/config/firebase";

const config = {
  credential: cert({
    clientEmail: firebaseConfig.ADMIN_CLIENT_EMAIL,
    privateKey: firebaseConfig.ADMIN_PRIVATE_KEY,
    projectId: firebaseConfig.PROJECT_ID,
  }),
}

export const runAdminApp = () => getApps() <= 0 && initializeApp(config)