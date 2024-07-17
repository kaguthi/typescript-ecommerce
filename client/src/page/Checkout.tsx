import {Elements} from '@stripe/react-stripe-js';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from 'react';
import { host } from '@/utils/constants';
import { useCartContext } from '@/context/cartContext';

const stripePromise: Promise<Stripe | null> = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const { cartProducts } = useCartContext()

  useEffect(() => {
    fetch(`${host}/create-payment-intent`, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json' 
      },
      body: JSON.stringify(cartProducts)
    })
      .then((res) => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch((error) => console.log(error))
  },
  [cartProducts])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Checkout