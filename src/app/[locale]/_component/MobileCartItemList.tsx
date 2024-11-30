import { useCart } from "@/app/[locale]/_component/CartItemContext";
import { useEffect, useState } from "react";

export default function MobileCartItemList() {
  const { cartItems, setCartItems } = useCart();
  const [total, setTotal] = useState(0);

  const increaseQuantity = (index: number) => {
    setCartItems((prev) =>
      prev!.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (index: number) => {
    setCartItems(
      (prev) =>
        prev!
          .map((item, i) =>
            i === index && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : { ...item, quantity: item.quantity - 1 }
          )
          .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
  };

  const removeItem = (index: number) => {
    setCartItems((prev) => prev!.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const totalPrice = cartItems
      ? cartItems
        .reduce(
          (total, item) => total + item.price * item.quantity, // Assuming each item has a 'price' property
          0
        )
        .toFixed(0)
        .toString()
      : "0";
    setTotal(parseInt(totalPrice));
  }, [cartItems]);

  return (
    <div className="bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg border dark:border-gray-700 mt-2 p-4 z-50">
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
                onClick={() => decreaseQuantity(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                -
              </button>
              <button
                onClick={() => increaseQuantity(index)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                +
              </button>
              <button
                onClick={() => removeItem(index)}
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
            ${total}
          </p>
        </div>
      )}
    </div>
  );
}
