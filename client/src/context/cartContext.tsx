import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { CartContextType, productDetail } from "@/utils/types";

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: CartProviderProps) => {
  const [numberOfProducts, setNumberOfProducts] = useState('0');
  const [cartProducts, setCartProducts] = useState<productDetail[]>([]);

  useEffect(() => {
    const storedProductsNumber = localStorage.getItem("numberOfProducts");
    if (storedProductsNumber) setNumberOfProducts(storedProductsNumber);

    const storedCartProducts = localStorage.getItem("cartProducts");
    if (storedCartProducts) setCartProducts(JSON.parse(storedCartProducts));
  }, []);

  const addProductToCart = (product: productDetail) => {
    setCartProducts(prevProducts => {
      const productIndex = prevProducts.findIndex(p => p._id === product._id);
      let updatedProducts;

      if (productIndex === -1) {
        updatedProducts = [...prevProducts, { ...product, count: 1 }];
      } else {
        updatedProducts = prevProducts.map((p, index) =>
          index === productIndex ? { ...p, count: p.count + 1 } : p
        );
      }

      const updatedProductCount = updatedProducts.reduce((acc, p) => acc + p.count, 0).toString();
      setNumberOfProducts(updatedProductCount);
      localStorage.setItem("numberOfProducts", updatedProductCount);
      localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));

      return updatedProducts;
    });
  };

  return (
    <CartContext.Provider value={{ numberOfProducts, setNumberOfProducts, addProductToCart, cartProducts, setCartProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};
