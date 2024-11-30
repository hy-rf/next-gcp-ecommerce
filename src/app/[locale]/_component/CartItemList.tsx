"use client";
import { useCart } from "@/app/[locale]/_component/CartItemContext";
import { useState } from "react";

export default function CartItemList() {
  const { cartItems } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        className="h-[70px] pl-4 flex items-center justify-center"
        onClick={() => setShowCart((old) => !old)}
      >
        <svg
          width="28px"
          height="28px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <path
            d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>

      {/* Cart Popup */}
      {showCart && (
        <div className="absolute bg-white shadow-lg rounded-lg border right-0 mt-2 w-80 p-4 z-50">
          {/* Cart Header */}
          <h3 className="text-lg font-bold text-gray-700 mb-4">Your Cart</h3>

          {/* Cart Items */}
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4 p-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                <p className="text-sm text-gray-800">{item.productId}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty!</p>
          )}
        </div>
      )}
    </div>
  );
}
