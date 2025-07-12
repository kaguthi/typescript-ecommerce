import { FormEvent, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import './checkout.css';
import type { StripePaymentElementOptions } from "@stripe/stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          setTimeout(() => {
            window.history.replaceState({}, document.title, window.location.pathname);
            window.location.replace("/success");
          }, 1000);
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        const errorMsg =
          error.type === "card_error" || error.type === "validation_error"
            ? error.message || "An error occurred."
            : "An unexpected error occurred.";
        setMessage(errorMsg);
      }
    } catch (err) {
      console.error("Payment confirmation error:", err);
      setMessage("A network or unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <h3 className="font-bold mb-2 text-xl">Payment using Stripe</h3>
      <form id="payment-form" onSubmit={handleSubmit} className="form">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className={`button ${isLoading ? "button-disabled" : ""}`}
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {message && (
          <div id="payment-message" role="alert" className="text-red-500 mt-2">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
