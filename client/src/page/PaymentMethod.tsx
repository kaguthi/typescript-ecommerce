import { Link } from "react-router-dom"

function PaymentMethod() {
  return (
    <div className="flex justify-center items-center min-h-screen gap-3">
        <div className="border border-solid rounded-md p-5 hover:bg-green-700 hover:text-white">
            <Link to="/mpesa">Mpesa</Link>
        </div>
        <div className="border border-solid rounded-md p-5 hover:bg-purple-600 hover:text-white">
            <Link to="/checkout">Stripe</Link>
        </div>
    </div>
  )
}

export default PaymentMethod