"use client";
import fetchData from "@/lib/fetchData";
import { CartItem } from "@/model";
import { UpdateCartItemBody } from "@/model/dto";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function CartItemList({
  onClickingLinksInCartItemList,
}: {
  onClickingLinksInCartItemList: () => void;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const cartItems = await fetchData<CartItem[]>("/api/v2/cart-item");
        setCartItems(cartItems);
      } catch {
        console.log("No cart item or not log in");
        setCartItems([]);
      }
    })();
  }, []);
  const total = useMemo(() => {
    if (cartItems.length == 0) return 0;
    let ret = 0; // Initialize ret to 0
    try {
      cartItems.forEach((ele) => {
        ret += ele.price * ele.quantity; // Accumulate the total
      });
      return ret;
    } catch {
      return 0;
    } // Return the total
  }, [cartItems]);
  async function handlePlusCartItem(cartItem: CartItem) {
    const body: UpdateCartItemBody = {
      id: cartItem.id!,
      productId: cartItem.productId,
      number: 1,
      mode: "plus",
    };
    await fetch("/api/v2/cart-item", {
      method: "put",
      body: JSON.stringify(body),
    }).then((res) => res.json());
    (async () => {
      try {
        const cartItems = await fetchData<CartItem[]>("/api/v2/cart-item");
        setCartItems(cartItems);
      } catch {
        console.log("No cart item or not log in");
        setCartItems([]);
      }
    })();
  }
  async function handleMinusCartItem(cartItem: CartItem) {
    const body: UpdateCartItemBody = {
      id: cartItem.id!,
      productId: cartItem.productId,
      number: 1,
      mode: "minus",
    };
    await fetch("/api/v2/cart-item", {
      method: "put",
      body: JSON.stringify(body),
    }).then((res) => res.json());
    (async () => {
      try {
        const cartItems = await fetchData<CartItem[]>("/api/v2/cart-item");
        setCartItems(cartItems);
      } catch {
        console.log("No cart item or not log in");
        setCartItems([]);
      }
    })();
  }
  async function handleDeleteCartItem(cartItem: CartItem) {
    return cartItem;
  }

  return (
    <div className="bg-gray-200 w-full dark:bg-gray-500 shadow-lg rounded-lg p-4 z-50">
      {/* Cart Header */}
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
        Your Cart
      </h3>

      {/* Cart Items */}
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-4 p-3 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm"
          >
            <div>
              <a href={`/product/${item.productId}`} className="no-underline">
                <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold">
                  {item.name}
                </p>
              </a>

              <p className="text-xs text-gray-600 dark:text-gray-400">
                Qty: {item.quantity}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleMinusCartItem(item)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                -
              </button>
              <button
                onClick={() => handlePlusCartItem(item)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                +
              </button>
              <button
                onClick={() => handleDeleteCartItem(item)}
                className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                X
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Your cart is empty!
        </p>
      )}

      {/* Total Price */}
      {cartItems && cartItems.length > 0 && (
        <div className="flex justify-between items-center mt-4 border-t pt-4 border-gray-300 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Total:
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {total}
          </p>
        </div>
      )}
      <Link href="/cart" onClick={onClickingLinksInCartItemList}>
        Ckeck out
      </Link>
    </div>
  );
}
