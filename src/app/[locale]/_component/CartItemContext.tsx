"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { CartItem } from "@/model";

interface CartItemContextType {
  cartItems: CartItem[] | null;
  setCartItems: Dispatch<SetStateAction<CartItem[] | null>>;
  token: string | null;
}

async function fetchCartItems(token: string): Promise<CartItem[]> {
  return (await fetch("/api/cart/cartitem?isDefaultCart=true", {
    headers: { Cookie: `token=${token}` },
  }).then((res) => res.json())) as CartItem[];
}

const CartItemContext = createContext<CartItemContextType | undefined>(
  undefined,
);

export function CartItemProvider({
  children,
  token,
}: {
  children: ReactNode;
  token: string | null;
}) {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);

  useEffect(() => {
    if (token) {
      fetchCartItems(token)
        .then((res) => setCartItems(res))
        .catch(() => setCartItems(null));
    }
  }, [token]);
  useEffect(() => {
    (async () => {
      await fetch("/api/cart/cartitem", {
        method: "put",
        body: JSON.stringify(cartItems),
      })
        .then(async (res) => res.text())
        .then((res) => console.log(res));
    })();
  }, [cartItems]);
  return (
    <CartItemContext.Provider value={{ cartItems, setCartItems, token }}>
      {children}
    </CartItemContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartItemContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
