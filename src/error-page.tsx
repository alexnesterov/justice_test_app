import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <section>
        <div className="container mx-auto mt-16 px-6">
          <div className="flex items-baseline">
            <h1 className="text-2xl font-bold">{error.status}</h1>
            <p className="ml-2">- {error.statusText}.</p>
          </div>
          {error.error?.message && (
            <p className="mt-1 text-sm text-gray-400">{error.error.message}</p>
          )}
          <div className="mt-4 text-sm">
            <Link className="text-blue-500 underline hover:no-underline" to="/">
              Перейти на главную
            </Link>
          </div>
        </div>
      </section>
    )
  } else {
    return <div>Что-то пошло не так.</div>
  }
}
