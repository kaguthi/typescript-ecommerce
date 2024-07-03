import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { productDetail } from "@/utils/types";
import { host } from "@/utils/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";


function Home() {
  const navigate = useNavigate();
  const [products, setproducts] = useState<productDetail[]>([]);

  useEffect(() => {
    const token = document.cookie;
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  
  useEffect(() => {
    fetch (`${host}/products`, {
      headers: {
        "authorization": document.cookie
      }
    })
    .then(response => response.json())
    .then(data => setproducts(data))
    .catch(error => toast.error(error))
  }, []);
  
  const token = document.cookie;

  const addToCart = () => {
    toast.success("Product added to cart")
  }

  return token ? (
    <div className="sm:flex sm:flex-col sm:justify-center lg:flex lg:flex-row lg:flex-wrap w-full justify-center">
      <Toaster />
      {
        products && products.length >  0 ? 
         products.map((product, index) => (
            <Card key={index} className="size-72 m-4">
              <CardHeader className="flex items-center">
                <img src={`${host}/uploads/${product.image}`} alt={product.name} className="size-28"/>
              </CardHeader>
              <CardContent>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>
                ${product.price}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button onClick={addToCart}>Add to cart</Button>
              </CardFooter>
            </Card>
         ))
        : <div className="text-center">No Products found</div>
      }
    </div>
  ) : null;
}

export default Home;
