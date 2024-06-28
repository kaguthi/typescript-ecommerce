import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
        <h2>Sorry Page Not Found!!!</h2>
        <Link to="/" className="p-3 bg-primary text-slate-100 font-semibold rounded-lg mt-10">Return Home</Link>
    </div>
  )
}

export default NotFound