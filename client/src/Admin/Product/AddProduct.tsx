/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { host } from "@/utils/constants"; 
import { productSchema } from "@/utils/types";
import { useAuth } from "../../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

function AddProduct() {
  const [product, setProduct] = useState<productSchema>({ name: "", price: 0, image: null, description: "" });
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('description', product.description);
    if (product.image) {
      formData.append('image', product.image)
    }

    try {
      const response = await fetch(`${host}/products/create`, {
        method: 'POST',
        body: formData,
        headers: {
          "authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      toast.success(data.message);
      setProduct({ name: "", price: 0, image: null, description: "" });
      navigate('/product')
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col m-5">
        <div className="w-full mt-5">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            className="mt-1 w-full" 
            value={product.name} 
            onChange={(e) => setProduct({ ...product, name: e.target.value })} 
          />
        </div>
        <div className="mt-5 w-full">
          <label htmlFor="price">Price</label>
          <Input 
            type="number"
            className="mt-1 w-full"
            value={product.price} 
            onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} 
          />
        </div>
        <div className="w-full mt-5">
          <label htmlFor="description">Description</label>
          <Textarea
            className="mt-1 w-full"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>
        <div className="w-full mt-5">
          <label htmlFor="image">Image</label>
          <Input
            type="file"
            name="image"
            className="mt-1 w-full"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setProduct({ ...product, image: file})
            }}
          />
        </div>
        <Button type="submit" className="mt-3 w-full">{isLoading ? <div className="flex items-center"><Loader2 className="animate-spin mr-1" /> Add</div> : "Add Product"}</Button>
      </form>
    </div>
  );
}

export default AddProduct;
