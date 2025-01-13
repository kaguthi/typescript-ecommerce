import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { useEffect } from "react";

function Success() {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <p className="font-bold text-[50px] text-center text-green-600">
        Thank You for shopping with us!
      </p>
      <Link
        to="/"
        className="bg-primary p-3 text-white rounded-md mt-4 hover:bg-primary-dark transition"
      >
        Return to Home Page
      </Link>
    </div>
  );
}

export default Success;
