"use client";
import fetchData from "@/lib/fetchData";
import { CartItem } from "@/model";
import { UpdateCartItemBody } from "@/model/dto";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { toast } from "sonner";

export enum ChangeCartItemMode {
  Plus,
  Minus,
}

export const CartContext = createContext<CartItem[]>([]);

export const CartActionContext = createContext<{
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  addCartItem: (newCart: CartItem) => Promise<void>;
  changeCartItem: (
    cartItem: CartItem,
    mode: ChangeCartItemMode
  ) => Promise<void>;
  deleteCartItem: (cartItem: CartItem) => Promise<void>;
}>({
  setCartItems: async () => {},
  addCartItem: async () => {},
  changeCartItem: async () => {},
  deleteCartItem: async () => {},
});

export default function CartProvider({
  initialCart,
  children,
}: {
  initialCart: CartItem[];
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState(initialCart);
  // if user logged in save into user cart db else guest cart db
  const addCartItem = async (newCart: CartItem) => {
    const quantity = 1;
    const response = await fetch("/api/v2/cart-item", {
      method: "post",
      body: JSON.stringify(newCart),
    });
    if (response.status === 410) {
      toast.error("No stock");
      return;
    }
    if (response.status === 409) {
      // if conflict
      const body: UpdateCartItemBody = {
        id: (await response.json()).cartItemId,
        productId: newCart.productId,
        number: quantity,
        mode: "plus",
      };
      // if same product and spec was added to cart, call put api
      const addQuantityResponse = await fetch("/api/v2/cart-item", {
        method: "put",
        body: JSON.stringify(body),
      });
      if (addQuantityResponse.status === 410) {
        toast.error(await addQuantityResponse.text());
      } else {
        toast.success("Added to cart!");
      }
    }
    toast.success("Added to cart!");
    const newCartItems: CartItem[] = (await fetchData<CartItem[]>(
      "/api/v2/cart-item"
    )) as CartItem[];
    setCartItems(newCartItems);
    return;
  };
  const changeCartItem = async (
    cartItem: CartItem,
    mode: ChangeCartItemMode
  ) => {
    switch (mode) {
      case ChangeCartItemMode.Plus:
        const body: UpdateCartItemBody = {
          id: cartItem.id!,
          productId: cartItem.productId,
          number: 1,
          mode: "plus",
        };
        const res = await fetch("/api/v2/cart-item", {
          method: "put",
          body: JSON.stringify(body),
        });
        if (res.status === 410) {
          toast.error("No stock");
        } else {
          toast.success("Add quantity success");
        }
        break;
      case ChangeCartItemMode.Minus:
        const bodyMinus: UpdateCartItemBody = {
          id: cartItem.id!,
          productId: cartItem.productId,
          number: 1,
          mode: "minus",
        };
        const resMinus = await fetch("/api/v2/cart-item", {
          method: "put",
          body: JSON.stringify(bodyMinus),
        });
        if (resMinus.status !== 200) {
          toast.error("Internal Server Error");
          return;
        }
        toast.success("Minus quantity success");
        break;
      default:
        break;
    }
    const newCartItems: CartItem[] = (await fetchData<CartItem[]>(
      "/api/v2/cart-item"
    )) as CartItem[];
    setCartItems(newCartItems);
    return;
  };
  const deleteCartItem = async (cartItem: CartItem) => {
    const res = await fetch("/api/v2/cart-item", {
      method: "delete",
      body: JSON.stringify({
        id: cartItem.id,
      }),
    });
    switch (res.status) {
      case 200:
        toast.success("Delete Success!");
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 403:
        toast.error("Forbidden");
        break;
      default:
        toast.error("Internal Server Error");
        break;
    }
    const newCartItems: CartItem[] = (await fetchData<CartItem[]>(
      "/api/v2/cart-item"
    )) as CartItem[];
    setCartItems(newCartItems);
    return;
  };

  return (
    <CartContext.Provider value={cartItems}>
      <CartActionContext.Provider
        value={{
          setCartItems,
          addCartItem,
          changeCartItem,
          deleteCartItem,
        }}
      >
        {children}
      </CartActionContext.Provider>
    </CartContext.Provider>
  );
}
