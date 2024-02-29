"use client";

import { useState } from "react";
import Link from "next/link";

import { signUp } from "@/lib/firebase/actions";

const SignUp = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [rol, setRol] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [sendEmail, setSendEmail] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signUp({ user: { email, password }, sendEmail: true, rol });
      setSendEmail(true);
      setEmail(null);
      setPassword(null);
      setRol(null);
      setErrorMessage(null);
      setLoading(false);
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        setErrorMessage("El email ya está en uso");
      if (error.code === "auth/invalid-email")
        setErrorMessage("El email no es válido");
      if (error.code === "auth/missing-email")
        setErrorMessage("Falta el email");
      if (error.code === "auth/weak-password")
        setErrorMessage("La contraseña es muy débil");
      if (error.code === "auth/operation-not-allowed")
        setErrorMessage("La operación no está permitida");
      if (error.code === "auth/internal-error")
        setErrorMessage("Error interno del servidor");
      if (error.code === "auth/too-many-requests")
        setErrorMessage("Demasiadas solicitudes");
      if (error.code === "auth/admin-restricted-operation")
        setErrorMessage("Operación restringida para administradores");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="uppercase">Registrarse</h1>

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
        <div className="grid grid-cols-1 gap-2">
          <label className="text-sm opacity-50" htmlFor="rol">
            Rol
          </label>
          <select
            className="py-1 px-2 rounded-md bg-inherit border border-white border-opacity-30"
            name="rol"
            defaultValue=""
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="" disabled hidden className="text-sm opacity-50">
              Selecciona un rol
            </option>
            <option value="admin">Administrador</option>
            <option value="profesor">Profesor</option>
            <option value="alumno">Alumno</option>
          </select>
        </div>
        <button
          className={`bg-blue-500 py-2 rounded-md transition-all duration-100 ease-linear active:scale-95 ${
            loading && "opacity-50 pointer-events-none"
          }`}
          disabled={loading}
        >
          {loading ? "Cargando.." : "Crear cuenta"}
        </button>
      </form>
      {sendEmail && (
        <p className="text-sm opacity-50">
          Recibirás un correo electrónico para confirmar tu cuenta
        </p>
      )}
      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
      <p className="text-sm opacity-50">
        ¿Ya tienes cuenta? 👉{" "}
        <Link href="/sign-in" className="text-blue-500">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default SignUp;

export const metadata = {
  title: "Crear cuenta",
};
