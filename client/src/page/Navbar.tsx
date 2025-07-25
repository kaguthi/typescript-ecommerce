import { Link } from "react-router-dom";
import { LogOut, Menu, ShoppingCart, User, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../context/AuthContext";
import useLogout from "./auth/Logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import Cart from "./Cart";
import { useCartContext } from "@/context/cartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

function Navbar() {
  const { token, name, profileImage, role } = useAuth();
  const { numberOfProducts } = useCartContext();
  const logout = useLogout();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // <- separate cart control

  const { setTheme } = useTheme();
  return (
    <div className="bg-primary flex items-center justify-between sticky top-0 z-50 px-4 py-3">
      <Link
        to={role === "admin" ? "/admin" : "/"}
        className="text-amber-600 text-2xl font-semibold"
      >
        E-Buy
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex space-x-4 items-center">
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Sun className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        {token ? (
          <>
            {role === "admin" ? (
              <>
                <li>
                  <Link to="user" className="text-slate-200 text-xl">User</Link>
                </li>
                <li>
                  <Link to="product" className="text-slate-200 text-xl">Product</Link>
                </li>
                <li>
                  <Link to="allOrder" className="text-slate-200 text-xl">Order</Link>
                </li>
              </>
            ) : (
              <>
                <li className="relative">
                  <button onClick={() => setCartOpen(true)}>
                    <ShoppingCart className="text-slate-200 cursor-pointer size-6" />
                  </button>
                  <Badge className="absolute top-0 right-0 w-4 h-4 text-xs" variant="destructive">
                    {numberOfProducts}
                  </Badge>
                </li>
                <li>
                  <Link to="order" className="text-slate-200 text-xl">Order</Link>
                </li>
              </>
            )}
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
                      <User className="mr-2 h-4 w-4" />
                      <Link to="profile">Profile</Link>
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
              <Avatar className="size-8">
                {profileImage && profileImage !== "undefined" ? (
                  <AvatarImage src={`${profileImage}`} />
                ) : (
                  <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin" className="text-slate-200 text-xl">Sign In</Link>
            </li>
            <li>
              <Link to="/signup" className="text-slate-200 text-xl">Sign Up</Link>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex gap-4">
        {token && role !== "admin" && (
          <button onClick={() => setCartOpen(true)} className="relative">
            <ShoppingCart className="text-white size-6" />
            <Badge className="absolute top-0 right-0 w-4 h-4 text-xs" variant="destructive">
              {numberOfProducts}
            </Badge>
          </button>
        )}
        <button onClick={() => setMenuOpen(true)}>
          <Menu className="text-white size-6" />
        </button>
      </div>

      {/* Cart Sheet */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>

      {/* Mobile Menu Sheet */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <ul className="mt-4 space-y-4 text-lg">
            {token ? (
              <>
                {role === "admin" ? (
                  <>
                    <li><Link to="user" onClick={() => setMenuOpen(false)}>User</Link></li>
                    <li><Link to="product" onClick={() => setMenuOpen(false)}>Product</Link></li>
                    <li><Link to="allOrder" onClick={() => setMenuOpen(false)}>Order</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="order" onClick={() => setMenuOpen(false)}>Orders</Link></li>
                  </>
                )}
                <li><Link to="profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
                <li onClick={() => { logout(); setMenuOpen(false); }}>Logout</li>
              </>
            ) : (
              <>
                <li><Link to="/signin" onClick={() => setMenuOpen(false)}>Sign In</Link></li>
                <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
              </>
            )}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Navbar;
