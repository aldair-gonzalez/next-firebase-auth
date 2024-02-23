"use client";

export default function Home() {
  const handleLogout = async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    window.location.reload()
  };

  return (
    <main className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      Mi página protegida
      <button onClick={() => handleLogout()}>Cerrar sesion</button>
    </main>
  );
}
