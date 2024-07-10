import { useState, useEffect } from "react";
import { useAuth } from "./auth/AuthContext";
import { host } from "@/utils/constants";
import toast from "react-hot-toast";
import { productDetail } from "@/utils/types";
import { CircleMinus, CirclePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function Cart() {
    const [products, setProducts] = useState<productDetail[]>([]);
    const { token } = useAuth();

    useEffect(() => {
        fetch(`${host}/products`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => setProducts(data.map(product => ({ ...product, count: 1 }))))
        .catch(err => toast.error(err.message));
    }, [token]);

    const increment = (index: number) => {
        setProducts(products.map((product, i) => 
            i === index ? { ...product, count: product.count + 1 } : product
        ));
    };
    
    const decrement = (index: number) => {
        setProducts(products.map((product, i) => 
            i === index && product.count > 1 ? { ...product, count: product.count - 1 } : product
        ));
    };

    const deleteItem = (index: number) => {
        setProducts(products.filter((_, i) => i !== index));
        toast.success("Deleted Successfully");
    };

    return (
        <div className="flex flex-col">
            {
                products && products.length > 0 ?
                products.map((product, index) => (
                    <div key={index} className="flex justify-between mt-5 p-4">
                        <div>
                            <img src={`${host}/uploads/${product.image}`} alt={product.name} width={100} height={100} />
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold">{product.name}</div>
                            <h6 className="">Price: ${product.price}</h6>
                            <div className="flex items-center">
                                <Button onClick={() => increment(index)}><CirclePlus className="w-[15px] h-[15px]" /></Button>
                                <span className="px-3">{product.count}</span>
                                <Button onClick={() => decrement(index)}><CircleMinus className="w-[15px] h-[15px]" /></Button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="right-0">
                                <Trash2 className="size-5 cursor-pointer" onClick={() => deleteItem(index)} />
                            </div>
                        </div>
                    </div> 
                ))
                : <div>No products found</div>
            }
            <Button className="w-full">Checkout</Button>
        </div>
    );
}

export default Cart;
