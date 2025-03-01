"use client";

import { CartItem, Product } from "@/model";
import { useContext, useState } from "react";
import LocaleContext from "../../component/LocaleContext";
import { toast } from "sonner";
import { AuthContext } from "@/services/auth/AuthContext";
import { CartActionContext } from "@/services/cart/CartProvider";

export default function AddToCartButton({
  product,
  showSpec,
  showQuantity,
}: {
  product: Product;
  showSpec: boolean;
  showQuantity: boolean;
}) {
  const { addCartItem } = useContext(CartActionContext);

  const { dict } = useContext(LocaleContext);
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedSpec, setSelectedSpec] = useState(
    product.specs ? product.specs[0] : null
  );
  async function handleAddToCart(product: Product, quantity: number) {
    // where to place check user for front end
    if (!user) {
      toast.error(dict.product_add_to_cart_toast_message_not_logged_in);
      return;
    }
    const newCart: CartItem = {
      productId: product.id!,
      name: product.name,
      quantity: quantity,
      price: product.price,
      spec: selectedSpec || undefined,
    };
    await addCartItem(newCart);
    return;
  }
  return (
    <>
      {/* Right side: Controls (Specs, Quantity, Add to Cart) */}
      <div className="flex flex-col items-end">
        {/* Specification Dropdown */}
        {showSpec && product.specs && product.specs.length > 0 && (
          <div className="w-full">
            <label
              htmlFor="spec"
              className="block text-sm font-medium text-gray-700"
            >
              Choose Specification
            </label>
            <select
              id="spec"
              className="mt-1 p-2 border rounded-md w-full"
              value={selectedSpec!}
              onChange={(e) => setSelectedSpec(e.target.value)}
            >
              {product.specs.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity Selector */}
        {showQuantity && (
          <div className="flex items-center space-x-0">
            <label htmlFor="quantity" className="text-sm text-gray-700">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
              min="1"
              className="p-1 border rounded-md w-20"
            />
          </div>
        )}
        <button
          onClick={() => handleAddToCart(product, quantity)}
          className="bg-add-to-cart-button-bg-color text-white font-medium px-1 rounded-md transition duration-200 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1, // Adjust the value here if you want more lines
            lineClamp: 1,
            overflow: "hidden", // Ensure this is present for ellipsis to work
          }}
        >
          {dict.add_to_cart_button_inner_text}
        </button>
      </div>
    </>
  );
}
