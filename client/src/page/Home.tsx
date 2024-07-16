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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { useCartContext } from "@/context/cartContext";
import { LoaderCircle } from "lucide-react";

function Home() {
  const [products, setProducts] = useState<productDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();
  const { addProductToCart } = useCartContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${host}/products`, {
          headers: {
            "authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const addToCart = (index: number) => {
    const productToAdd = products[index];
    addProductToCart(productToAdd);
    toast.success("Product added successfully.");
  };

  if (loading) return <div className="flex items-center justify-center mt-10"><LoaderCircle className="animate-spin size-14"/></div>

  return (
    <div className="xs:flex xs:flex-col xs:justify-center sm:flex sm:flex-col sm:items-center lg:flex lg:flex-row lg:flex-wrap w-full justify-center mt-3">
      <Toaster />
      {products && products.length > 0 ? (
        products.map((product, index) => (
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
