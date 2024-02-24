"use client";

import { useAuth } from "@/lib/firebase/useAuth";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const user = useAuth();

  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  const handleLogout = async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    window.location.reload();
  };

  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <p>Cargando...</p>
    </div>
  ) : (
    <main className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      Mi página protegida
      <h1>Bienvenido</h1>
      <h2>Tu usuario es: {user && user.email}</h2>
      <ul className="flex gap-5 text-sm">
        <li className="text-orange-500 hover:opacity-80">
          <Link href="/dashboard/admin">Dashboard de administrador</Link>
        </li>
        <li className="text-orange-500 hover:opacity-80">
          <Link href="/dashboard/profesor">Dashboard de profesor</Link>
        </li>
        <li className="text-orange-500 hover:opacity-80">
          <Link href="/dashboard/alumno">Dashboard de alumno</Link>
        </li>
      </ul>
      <button onClick={() => handleLogout()}>Cerrar sesion</button>
    </main>
  );
}
