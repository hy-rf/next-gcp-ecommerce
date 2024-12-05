import { CartItem } from "@/model";
import { useEffect, useState } from "react";

export default function useCart(initialFetchUrl: string) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch the initial cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(initialFetchUrl);
        const data: CartItem[] = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      }
    };

    fetchCart();
  }, [initialFetchUrl]);

  // Add an item to the cart
  const addItem = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // If the item already exists, update its quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Add the new item to the cart
        return [...prevCart, item];
      }
    });
  };

  // Modify an item's quantity (increment or decrement)
  const modifyItemQuantity = (itemId: string, delta: number) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((cartItem) =>
            cartItem.id === itemId
              ? { ...cartItem, quantity: cartItem.quantity + delta }
              : cartItem
          )
          .filter((cartItem) => cartItem.quantity > 0) // Remove items with quantity <= 0
    );
  };

  // Delete an item from the cart
  const deleteItem = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    setCart,
    addItem,
    modifyItemQuantity,
    deleteItem,
    clearCart,
  };
}
