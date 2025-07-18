/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useCartContext } from "@/context/cartContext";
import { host } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { cartProducts } = useCartContext();
  const { userId } = useAuth();

  useEffect(() => {
    if (!cartProducts || cartProducts.length === 0) {
      toast.error("Your cart is empty!");
      setLoading(false);
      return;
    }

    const fetchClientSecret = async () => {
      try {
        const response = await fetch(`${host}/create-payment-intent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ products: cartProducts, userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to create payment intent");
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error: any) {
        toast.error(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [cartProducts, userId]);

  const appearance = {
    theme: "stripe",
  };
  const options = clientSecret
  ? {
      clientSecret,
      appearance,
    }
  : undefined;


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading ? (
        <div className="flex flex-col items-center gap-2">
          <span className="text-lg font-medium text-gray-700">Preparing Checkout...</span>
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : clientSecret ? (
        stripePromise && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )
      ) : (
        <div className="text-center text-red-500">
          Failed to load payment options. Please try again later.
        </div>
      )}
    </div>
  );
}

export default Checkout;
