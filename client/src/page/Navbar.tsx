import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { host } from "@/utils/constants";
import { useAuth } from "./auth/AuthContext";
import useLogout from "./auth/Logout";
import { Button } from "@/components/ui/button";

function Navbar() {
  const { token, name, profileImage } = useAuth();
  const logout = useLogout();
  return (
    <div className="bg-primary flex space-x-2 justify-between sticky top-0">
      <Link to="/" className="text-amber-600 text-2xl text-center py-4 px-4 font-semibold">E-Buy</Link>
      <nav className="py-4">
        <ul className="flex space-x-2 items-center">
          <li>
            <Link to="/cart" className="text-slate-200">
              <ShoppingCart className="text-slate-200" aria-label="Shopping Cart" />
            </Link>
          </li>
          <li>
            <Link to="/user" className="text-slate-200 text-xl">User</Link>
          </li>
          <li>
            <Link to="/product" className="text-slate-200 text-xl">Product</Link>
          </li>
          {token ? (
            <>
              <li>
                <h4 className="text-slate-200 text-xl">{name}</h4>
              </li>
              <li>
                {
                  profileImage && profileImage != "undefined" ? 
                  <Avatar className="size-8 mr-10">
                    <AvatarFallback><img src={`${host}/uploads/${profileImage}`}/></AvatarFallback>
                  </Avatar> :
                  <Avatar className="size-8 mr-10">
                    <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                }
              </li>
              <li>
                <Button onClick={logout} className="text-slate-200 text-xl" variant="secondary">Logout</Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin" className="text-slate-200 text-xl">Sign In</Link>
              </li>
              <li>
                <Link to="/signup" className="text-slate-200 text-xl pr-4">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
