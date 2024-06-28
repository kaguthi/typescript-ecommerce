import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import beans from "../assets/beans.jpg";
import bread from "../assets/bread.jpg";
import broccoli from "../assets/broccoli.jpg";
import meat from "../assets/meat.jpg";
import peas from "../assets/peas.jpg";

function Home() {
  const navigate = useNavigate();

  const imageDetails = [
    {
      title: "Beans",
      image: beans,
      price: 25,
    },
    {
      title: "Bread",
      image: bread,
      price: 50,
    },
    {
      title: "Broccoli",
      image: broccoli,
      price: 35,
    },
    {
      title: "Meat",
      image: meat,
      price: 100,
    },
    {
      title: "Peas",
      image: peas,
      price: 30,
    },
  ];

  const open = () => {
    toast.success("Item added to cart");
  };

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
      {imageDetails.map((imagedetail, index) => (
        <Card key={index} className="w-80 mt-10 mx-10">
          <CardHeader className="flex justify-center items-center">
            <img src={imagedetail.image} alt={imagedetail.title} className="w-36 h-40" />
          </CardHeader>
          <CardContent>
            <CardTitle className="font-semibold">
              {imagedetail.title}
            </CardTitle>
            <CardDescription className="text-orange-500">
              ${imagedetail.price}
            </CardDescription>
            <CardFooter>
              <Button onClick={open}>Buy</Button>
            </CardFooter>
          </CardContent>
        </Card>
      ))}
    </div>
  ) : null;
}

export default Home;
