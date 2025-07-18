import { useState, useEffect } from "react";
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
    <div className="flex flex-col p-4">
      {cartProducts && cartProducts.length > 0 ? (
        cartProducts.map((product, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between items-center mt-5 p-4 border-b border-gray-200"
          >
            <div>
              <img
                src={`${product.image}`}
                alt={product.name}
                className="w-24 h-24 object-cover"
              />
            </div>
            <div className="flex flex-col ml-4 flex-grow">
              <div className="font-bold text-lg">{product.name}</div>
              <h6 className="text-gray-600">Price: ${product.price}</h6>
              <div className="flex items-center mt-2">
                <CircleMinus
                  className={`w-5 h-5 cursor-pointer ${
                    product.count === 1 ? "text-gray-400 cursor-not-allowed" : ""
                  }`}
                  onClick={() => product.count > 1 && decrement(index)}
                />
                <span className="px-3">{product.count}</span>
                <CirclePlus className="w-5 h-5 cursor-pointer" onClick={() => increment(index)} />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Trash2 className="w-5 h-5 cursor-pointer" onClick={() => deleteItem(index)} />
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-5">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link to="/" className="text-primary hover:underline">
            Browse Products
          </Link>
        </div>
      )}
      {cartProducts.length > 0 && (
        <>
          <div className="flex justify-between mt-4 mb-4">
            <span className="font-bold text-lg">Total price:</span>
            <span className="text-lg font-semibold">${price.toFixed(2)}</span>
          </div>
          <Link to="paymentMethod">
            <Button className="w-full" disabled={cartProducts.length === 0}>
              Checkout
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
