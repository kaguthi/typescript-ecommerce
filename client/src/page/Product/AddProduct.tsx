import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { host } from "@/utils/constants"; 
import { productSchema } from "@/utils/types";
import { useAuth } from "../../context/AuthContext";

function AddProduct() {
  const [product, setProduct] = useState<productSchema>({ name: "", price: 0, image: null, description: "" });
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col m-5">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="p-3 border border-orange-500 rounded-md w-full" 
          value={product.name} 
          onChange={(e) => setProduct({ ...product, name: e.target.value })} 
        />
        <label htmlFor="price">Price</label>
        <input 
          type="number"
          className="p-3 m-5 border border-orange-500 rounded-md w-full"
          value={product.price} 
          onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} 
        />
        <label htmlFor="description">Description</label>
        <textarea
          className="p-3 border border-orange-500 rounded-md w-full"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          className="p-3 border border-orange-500 rounded-md w-full"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setProduct({ ...product, image: file})
          }}
        />
        <Button type="submit" className="mt-3 w-full">Add Product</Button>
      </form>
    </div>
  );
}

export default AddProduct;
