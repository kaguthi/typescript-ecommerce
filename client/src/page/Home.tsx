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
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

function Home() {
  const { token } = useAuth();
  const { addProductToCart } = useCartContext();
  const [searchTerm, setSearchTerm] = useState("");

  const { isLoading, data, error } = useQuery<productDetail[], Error>({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`${host}/products`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network Error");
        }
        return res.json();
      }),
  });

  const filteredProducts = useMemo(() => {
    if (!data) return [];
    return data.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const addToCart = (index: number) => {
    const productToAdd = filteredProducts[index];
    if (productToAdd) {
      addProductToCart(productToAdd);
      toast.success("Product added successfully.");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-10">
        <LoaderCircle className="animate-spin size-14" />
      </div>
    );

  if (error)
    return (
      <Alert variant="destructive" className="mt-5">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );

  return (
    <div className="flex items-center flex-wrap gap-2 justify-center">
      <Input
        type="text"
        className="mx-10 my-3"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Toaster />
      {filteredProducts && filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
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
