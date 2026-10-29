import { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '@/types/product';

interface CartContextData {
    cart: Product[];
    addToCart: (product: Product) => void;
    clearCart: () => void;
}

interface CartProviderProps {
    children: React.ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const loadCart = async () => {
            const storedCart = await AsyncStorage.getItem('@gotham_store:cart')

            if (storedCart) {
                setCart(JSON.parse(storedCart));
            }
        };

        loadCart()
    }, [])

    useEffect(() => {
        AsyncStorage.setItem('@gotham_store:cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: Product) => {
        setCart((currentCart) => [...currentCart, product])
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            clearCart,
        }}
        >
            {children}
        </CartContext.Provider>
    );
}