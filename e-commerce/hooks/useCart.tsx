import { CartProductType } from "@/types/product";
import { toast } from "react-hot-toast";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

type CartContextType = {
    cartTotalQuantity: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
};

interface Props {
    [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
    const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
        null
    );

    useEffect(() => {
        const cartItems: any = localStorage.getItem("eShopCartItems");
        const parsedProducts: CartProductType[] | null = JSON.parse(cartItems);

        setCartProducts(parsedProducts);
    }, []);

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product];
            } else {
                updatedCart = [product];
            }
 
            toast.success("Product added to cart");
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const value = {
        cartTotalQuantity,
        cartProducts,
        handleAddProductToCart,
    };

    return (
        <CartContext.Provider value={value} {...props}></CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }

    return context;
};
