import { Link } from "react-router-dom"

function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="font-bold text-[100px]">Success</p>
      <Link to='/' className="bg-primary text-slate-100 p-2 rounded-md">Return to Home Page</Link>
    </div>
  )
}

export default Success