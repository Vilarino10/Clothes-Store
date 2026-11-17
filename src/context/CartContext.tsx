import { Product } from "@/types/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { createContext, useEffect, useState } from "react";

interface CartContextData {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

interface StoredCart {
  cart: Product[];
  hash: string;
}

const CART_STORAGE_KEY = "@gotham_store:cart";

export const CartContext = createContext({} as CartContextData);

async function generateCartHash(cart: Product[]) {
  const cartData = cart.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
  }));

  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    JSON.stringify(cartData),
  );
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);

        if (storedCart) {
          const parsedData = JSON.parse(storedCart);

          if (Array.isArray(parsedData)) {
            setCart(parsedData);
          } else {
            const savedCart = parsedData as StoredCart;
            const calculatedHash = await generateCartHash(savedCart.cart);

            if (calculatedHash === savedCart.hash) {
              setCart(savedCart.cart);
            } else {
              console.warn("Os dados do carrinho foram alterados.");
              await AsyncStorage.removeItem(CART_STORAGE_KEY);
            }
          }
        }
      } catch (error) {
        console.error("Erro ao carregar o carrinho", error);
        await AsyncStorage.removeItem(CART_STORAGE_KEY);
      } finally {
        setCartLoaded(true);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      if (!cartLoaded) return;

      try {
        const hash = await generateCartHash(cart);

        const dataToSave: StoredCart = {
          cart,
          hash,
        };

        await AsyncStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(dataToSave),
        );
      } catch (error) {
        console.error("Erro ao salvar o carrinho", error);
      }
    };

    saveCart();
  }, [cart, cartLoaded]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((currentCart) => currentCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
