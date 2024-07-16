import { FormEvent, useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import toast from 'react-hot-toast'
import { host } from '@/utils/constants'
import { productSchema } from "@/utils/types"
import { Button } from "@/components/ui/button"
import { useAuth } from "../../context/AuthContext"

function EditProduct() {
  const [product, setProduct] = useState<productSchema>({name: "", price: 0, image: null, description: ""})
  const navigate = useNavigate();
  const [productId] = useSearchParams();
  const prodId = productId.get('productId')
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

    if (!prodId) {
      toast.error("Student ID is missing");
      return;
    }

    try {
      const response = await fetch(`${host}/products/update/${prodId}`, {
        method: 'PUT',
        body: formData,
        headers: {
          "authorization" : `Bearer ${token}`,
        }
      })
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      const data = await response.json();
      toast.success(data.message);
      setProduct({ name: "", price: 0, image: null, description: "" })
      navigate("/product")
    } catch (error: any) {
      toast.error(error.message);
    }
  } 

  // fetch data
  useEffect(() => {
    if(prodId) {
      fetch(`${host}/products/${prodId}`, {
        headers : {
          "authorization" : `Bearer ${token}`,
        }
    })
    .then(response => response.json())
    .then(data => setProduct(data))
    }
    
  },[prodId, token])

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
        <Button type="submit" className="mt-3 w-full">Update Product</Button>
      </form>
    </div>
  )
}

export default EditProduct