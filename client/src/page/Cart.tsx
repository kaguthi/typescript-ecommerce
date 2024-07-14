import { useState, useEffect } from "react";
import { host } from "@/utils/constants";
import toast from "react-hot-toast";
import { CircleMinus, CirclePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCartContext } from "@/context/cartContext";

function Cart() {
    const { setNumberOfProducts, cartProducts, setCartProducts } = useCartContext();
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const totalPrice = cartProducts.reduce((acc, product) => acc + product.price * product.count, 0);
        setPrice(totalPrice);

        const totalProducts = cartProducts.reduce((acc, product) => acc + product.count, 0);
        localStorage.setItem("numberofProducts", totalProducts.toString());
        setNumberOfProducts(totalProducts.toString());
    }, [cartProducts, setNumberOfProducts]);

    const increment = (index: number) => {
        setCartProducts(cartProducts.map((product, i) =>
            i === index ? { ...product, count: product.count + 1 } : product
        ));
    };

    const decrement = (index: number) => {
        setCartProducts(cartProducts.map((product, i) =>
            i === index && product.count > 1 ? { ...product, count: product.count - 1 } : product
        ));
    };

    const deleteItem = (index: number) => {
        setCartProducts(cartProducts.filter((_, i) => i !== index));
        toast.success("Deleted Successfully");
    };

    return (
        <div className="flex flex-col">
            {
                cartProducts && cartProducts.length > 0 ?
                cartProducts.map((product, index) => (
                    <div key={index} className="flex justify-between mt-5 p-4">
                        <div>
                            <img src={`${host}/uploads/${product.image}`} alt={product.name} width={100} height={100} />
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold">{product.name}</div>
                            <h6 className="">Price: ${product.price}</h6>
                            <div className="flex items-center">
                                <CircleMinus className="w-[20px] h-[20px] cursor-pointer" onClick={() => decrement(index)} />
                                <span className="px-3">{product.count}</span>
                                <CirclePlus className="w-[20px] h-[20px] cursor-pointer" onClick={() => increment(index)} />
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
            <div className="flex justify-between mt-4 mb-4">
                <span className="font-bold">Total price:</span>
                <span>$ {price}</span>
            </div>
           <Link to="checkout">
               <Button className="w-full" disabled={cartProducts.length === 0}>Checkout</Button>
           </Link>
        </div>
    );
}

export default Cart;
