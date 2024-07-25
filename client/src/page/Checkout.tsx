import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useCartContext } from "@/context/cartContext";
import { host } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function Checkout() {

  const [clientSecret, setClientSecret] = useState("");
  const { cartProducts } = useCartContext()
  const { userId } = useAuth()

  useEffect(() => {
    fetch(`${host}/create-payment-intent`, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({products: cartProducts, userId: userId})
    })
    .then(res => res.json())
    .then(data => setClientSecret(data.clientSecret))
  },[cartProducts, userId])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Checkout