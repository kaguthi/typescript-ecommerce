import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"


function Navbar() {
  const token = document.cookie;
  const name = localStorage.getItem("username");
  return (
    <div className="bg-primary flex space-x-2 justify-between sticky top-0">
        <Link to="/" className="text-amber-600 text-2xl text-center py-4 px-4 font-semibold">E-Buy</Link>
        <nav className="py-4">
            <ul className="flex space-x-2">
              <ShoppingCart className="text-slate-200"/>
              <Link to="student" className="text-slate-200 text-xl">User</Link>
              <Link to="product" className="text-slate-200 text-xl">Product</Link>
              {token ? 
               <>
                  <h4 className="text-slate-200 text-xl">{name}</h4> 
                  <Avatar className="size-8 mr-10">
                    <AvatarFallback>{name?.slice(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
               </>
                :
                <>
                <Link to="signin" className="text-slate-200 text-xl">Sign In</Link>
                <Link to="signup"className="text-slate-200 text-xl pr-4">Sign Up</Link> 
                </>
              }
            </ul>
        </nav>
    </div>
  )
}

export default Navbar