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

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}

export const metadata = {
  title: 'No autorizado',
}