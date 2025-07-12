import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { useEffect } from "react";

function Success() {
  useEffect(() => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
      }

      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }, 250);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-green-600">
        Thank You for shopping with us!
      </p>
      <Link
        to="/"
        className="bg-primary p-3 text-white rounded-md mt-6 hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-all duration-200"
      >
        Return to Home Page
      </Link>
    </div>
  );
}

export default Success;
