import { Link } from "react-router-dom";
import { LogOut, ShoppingCart, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { host } from "@/utils/constants";
import { useAuth } from "../context/AuthContext";
import useLogout from "./auth/Logout";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Cart from "./Cart";
import { useCartContext } from "@/context/cartContext";

function Navbar() {
  const { token, name, profileImage } = useAuth();
  const {numberOfProducts} = useCartContext();
  const logout = useLogout();
  return (
    <div className="bg-primary flex space-x-2 justify-between sticky top-0 z-10">
      <Link to="/" className="text-amber-600 text-2xl text-center py-4 px-4 font-semibold">E-Buy</Link>
      <nav className="py-4">
        <ul className="flex space-x-2 items-center">
          <li className="relative">
            <Sheet>
              <SheetTrigger asChild>
                <ShoppingCart className="text-slate-200 cursor-pointer size-7" aria-label="Shopping Cart" />
              </SheetTrigger>
              <SheetContent className="overflow-y-scroll">
                <SheetHeader>
                  <SheetTitle>Cart</SheetTitle>
                </SheetHeader>
                <Cart />
              </SheetContent>
            </Sheet>
            <Badge className="absolute top-0 right-0 w-4 h-4 text-xs text-center" variant="destructive">{numberOfProducts}</Badge>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <h4 className="text-slate-200 text-xl cursor-pointer">{name}</h4>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4"/>
                        <span><Link to='profile'>Profile</Link></span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span onClick={logout} className="cursor-pointer">Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
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
