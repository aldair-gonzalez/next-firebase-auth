"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "./firebase";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else setUser(null);
    });

    return () => unsubscribe();
  }, [user]);

  return user;
};
