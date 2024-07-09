import { useState, useEffect } from "react"
import { useAuth } from "./auth/AuthContext";
import { host } from "@/utils/constants";
import toast from "react-hot-toast";
import { productDetail } from "@/utils/types";
import { Trash2 } from "lucide-react";

function Cart() {
    const [products, setproducts] = useState<productDetail[]>([]);
    const { token } = useAuth();

    useEffect(() => {
        fetch(`${host}/products`, {
            headers: {
                "authorization" : `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => setproducts(data))
        .catch(err => toast.error(err))
    },[token])
    
    const deleteItem = () => {
        toast.success("Deleted Successfully")
    }
  return (
    <div className="flex flex-col">
        {
            products && products.length > 0 ?
            products.map((product, index) => (
                <div key={index} className="flex justify-between mt-5 p-4">
                    <div>
                        <img src={`${host}/uploads/${product.image}`} alt={product.name} width={100} height={100}/>
                    </div>
                    <div className="flex flex-col">
                        <div className="font-bold">{product.name}</div>
                        <h6 className="">Price: ${product.price}</h6>
                        <h6>Quantity: 1</h6>
                    </div>
                    <div className="flex flex-col">
                        <div className="right-0">
                            <Trash2 className="size-5 cursor-pointer" onClick={deleteItem}/>
                        </div>
                    </div>
                </div> 
            ))
            : <div>No products found</div>
        }
    </div>
  ) 
}

export default Cart