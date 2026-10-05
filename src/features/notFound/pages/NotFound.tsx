import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center bg-canvas px-4">
      <div className="surface w-full max-w-md p-10 text-center">
        <p className="text-sm font-bold tracking-[0.14em] text-brand">404</p>
        <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-ink">Page not found</h1>
        <p className="mt-2 text-sm text-muted">
          Bu sahifa mavjud emas yoki ko'chirilgan.
        </p>
        <Link to="/dashboard" className="btn-primary mt-6">
          Back to dashboard
        </Link>
      </div>
    </div>
  )
}
