/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useSearchParams } from "react-router-dom"
import toast from 'react-hot-toast'
import { useState, useEffect } from "react"
import { host } from '@/utils/constants'
import { productSchema } from "@/utils/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "../../context/AuthContext"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


function DeleteProduct() {
  const [product, setProduct] = useState<productSchema>({name: "", price: 0, image: null, description: ""})
  const navigate = useNavigate();
  const [productId] = useSearchParams();
  const prodId = productId.get('productId');
  const { token } = useAuth();
  const handleDelete = async () => {
    try {
      const response = await fetch(`${host}/products/delete/${prodId}`,{
        method: "DELETE",
        headers: {
          "authorization": `Bearer ${token}`,
        }
      })
      if(!response.ok) {
        throw new Error("Failed to delete product");
      }
      const data = await response.json();
      toast.success(data.message);
      navigate("/product");
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (prodId) {
      fetch(`${host}/products/${prodId}`,{
        headers: {
          "authorization" : `Bearer ${token}`,
        }
      })
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => toast.error(error.message))
    }
  },[prodId, token])

  return (
    <div>
       <form className="flex items-center justify-center flex-col m-5">
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
       <Dialog>
        <DialogTrigger className="bg-primary mt-10 p-3 w-full text-slate-50 rounded-md">Delete</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete of Product</DialogTitle>
            <DialogDescription>
            Are you absolutely sure want to delete this product?
            </DialogDescription>
          </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <Button type="button" onClick={handleDelete}>
                Delete
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </form>
    </div>
  )
}

export default DeleteProduct