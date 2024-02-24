"use client"

import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-5">
      <h1>Dashboard de administrador</h1>
      <button className="text-blue-500 hover:opacity-80" onClick={() => router.back()}>Regresar</button>
    </div>
  );
};
export default Page;
