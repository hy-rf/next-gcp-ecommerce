"use client";

import { CartItem } from "@/model";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartItems({ cartItems }: { cartItems: CartItem[] }) {
  const [selectedCartItem, setSelectedCartItem] = useState<
    Map<number, boolean>
  >(
    new Map(
      cartItems.map((_, index) => [index, true]) // Map to a Map with index as key and true as value
    )
  );
  useEffect(() => {
    // You can update this state if cartItems changes
    setSelectedCartItem(
      new Map(cartItems.map((_, index) => [index, true])) // Re-initialize if cartItems changes
    );
  }, [cartItems]);

  const toggleItemSelection = (index: number) => {
    setSelectedCartItem((prev) => {
      const newMap = new Map(prev);
      newMap.set(index, !newMap.get(index)); // Toggle the selection
      return newMap;
    });
  };

  const handlePlaceOrder = () => {
    console.log(getSelectedItems());
  };
  const getSelectedItems = () => {
    // Filter the cartItems based on the selected state (value true in the map)
    return cartItems.filter((_, index) => selectedCartItem.get(index) === true);
  };
  return (
    <div>
      {cartItems.map((item, index) => (
        <div
          key={item.productId}
          className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300"
        >
          <Link href={`/product/${item.productId}`}>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {item.name}
            </p>
          </Link>

          <p className="text-gray-600">Price: ${item.price}</p>
          <p className="text-gray-600">Product ID: {item.productId}</p>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-gray-600">Specification: {item.spec}</p>
          <input
            type="checkbox"
            checked={selectedCartItem.get(index) || false}
            onChange={() => toggleItemSelection(index)}
          />
        </div>
      ))}
      <button onClick={handlePlaceOrder}>checkout</button>
    </div>
  );
}
