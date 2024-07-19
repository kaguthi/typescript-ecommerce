import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Toaster } from "react-hot-toast"

function Layout() {
  return (
    <>
        <Navbar />
        <Toaster />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout