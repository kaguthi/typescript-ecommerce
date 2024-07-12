import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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
import { useAuth } from "./auth/AuthContext";

function Home() {
  const [products, setproducts] = useState<productDetail[]>([]);
  const {token} = useAuth();
  useEffect(() => {
    fetch (`${host}/products`, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => setproducts(data))
    .catch(error => toast.error(error))
  }, [token]);

  const addToCart = () => {
    toast.success("Product added to cart")
  }

  return(
    <div className="xs:flex xs:flex-col xs:justify-center sm:flex sm:flex-col sm:items-center lg:flex lg:flex-row lg:flex-wrap w-full justify-center mt-3">
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
  )
}

export default Home;
