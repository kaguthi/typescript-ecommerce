import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie;
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const token = document.cookie;

  return token ? (
    <div className="sm:flex sm:flex-col sm:items-center sm:mx-10 lg:flex lg:flex-row lg:flex-wrap">
      <Toaster />
    </div>
  ) : null;
}

export default Home;
