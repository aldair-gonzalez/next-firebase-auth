import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-10">
      <h1 className="font-black text-9xl">403</h1>

      <div className="grid grid-cols-1 gap-2 place-items-center">
        <p>No estas autorizado</p>
        <Link href="/" className="underline">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export const metadata = {
  title: "No autorizado",
};
