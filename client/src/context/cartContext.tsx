import { CartContextType, productDetail } from "@/utils/types";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";

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
    }, []);

    const addProductToCart = (product: productDetail) => {
        setCartProducts(prevProducts => [...prevProducts, product]);
        const updatedProductCount = (cartProducts.length + 1).toString();
        setNumberOfProducts(updatedProductCount);
        localStorage.setItem("numberOfProducts", updatedProductCount);
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
        throw new Error("useCartContext is not defined");
    }
    return context;
};
