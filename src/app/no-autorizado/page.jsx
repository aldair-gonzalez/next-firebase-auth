export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          403
        </h1>

        <p className="mt-3 text-2xl">
          Lo siento, no estás autorizado para ver esta página.
        </p>

        <p className="mt-3">
          <a href="/" className="text-2xl underline">
            Volver a la página principal
          </a>
        </p>
      </main>
    </div>
  )
}

export const metadata = {
  title: 'No autorizado',
}