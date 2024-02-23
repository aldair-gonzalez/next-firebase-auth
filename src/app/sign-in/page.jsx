"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signIn } from "@/lib/firebase/actions";

const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn({ email, password });
      setEmail(null);
      setPassword(null);
      setErrorMessage(null);
      setLoading(false);
      router.push("/");
    } catch (error) {
      if (error.code === "auth/missing-email")
        setErrorMessage("El email es requerido");
      if (error.code === "auth/missing-password")
        setErrorMessage("La contraseña es requerida");
      if (error.code === "auth/invalid-login-credentials")
        setErrorMessage("Credenciales inválidas");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="uppercase">Entrar</h1>

      <form
        className="grid grid-cols-1 gap-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-2">
          <label className="text-sm opacity-50" htmlFor="email">
            Email
          </label>
          <input
            className="py-1 px-2 rounded-md bg-inherit border border-white border-opacity-30"
            type="email"
            name="email"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label className="text-sm opacity-50" htmlFor="password">
            Contraseña
          </label>
          <input
            className="py-1 px-2 rounded-md bg-inherit border border-white border-opacity-30"
            type="password"
            name="password"
            placeholder="email@example.com"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={`bg-blue-500 py-2 rounded-md transition-all duration-100 ease-linear active:scale-95 ${
            loading && "opacity-50 pointer-events-none"
          }`}
          disabled={loading}
        >
          {loading ? "Cargando.." : "Iniciar sesión"}
        </button>
      </form>
      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
      <p className="text-sm opacity-50">
        No tienes cuenta? 👉{" "}
        <Link href="/sign-up" className="text-blue-500">
          Registrate
        </Link>
      </p>
    </div>
  );
};
export default SignIn;
