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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { useCartContext } from "@/context/cartContext";
import { LoaderCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function Home() {
  const { token } = useAuth();
  const { addProductToCart } = useCartContext();

  const {isLoading, data, error} = useQuery<productDetail[], Error>({
    queryKey: ["products"],
    queryFn: () => 
      fetch(`${host}/products`,
        {
          headers: {
            "authorization" : `Bearer ${token}`,
          }
        }).then(res => {
          if (!res.ok) {
            throw new Error("Network Error")
          }
          return res.json()
        })
  })

  const addToCart = (index: number) => {
    const productToAdd = data?.[index];
    if (productToAdd) {
      addProductToCart(productToAdd);
      toast.success("Product added successfully.");
    }
  };

  if (isLoading) return <div className="flex items-center justify-center mt-10"><LoaderCircle className="animate-spin size-14"/></div>

  if (error) return (
    <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
            {error.message}
        </AlertDescription>
    </Alert>
  );

  return (
    <div className="m-auto grid gap-1 mt-3 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Toaster />
      {data && data?.length > 0 ? (
        data.map((product, index) => (
          <Card key={index} className="size-72 m-4">
            <CardHeader className="flex items-center">
              <img
                src={`${host}/uploads/${product.image}`}
                alt={product.name}
                className="size-28"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>${product.price}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button onClick={() => addToCart(index)}>Add to cart</Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-center">No Products found</div>
      )}
    </div>
  );
}

export default Home;
