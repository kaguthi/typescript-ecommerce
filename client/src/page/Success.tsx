import { Link } from "react-router-dom"

function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="font-bold text-[50px]">Thank You for shopping with us.</p>
        <Link to='/' className="bg-primary p-2 text-slate-100 rounded-md mt-4">Return to home Page</Link>
    </div>
  )
}

export default Success