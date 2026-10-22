import { createContext, ReactNode, useState } from 'react';
import { Product } from '@/types/product';

interface CartContextData {
    cart: Product[];
    addToCart: (product: Product) => void;
}

interface CartProviderProps {
    children: React.ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart((currentCart) => [...currentCart, product])
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
        }}
        >
            {children}
        </CartContext.Provider>
    );
}