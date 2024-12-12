"use client";

import { Product } from "@/model";
import { UpdateCartItemBody } from "@/model/dto";
import { useContext, useState } from "react";
import LocaleContext from "../../_component/LocaleContext";
import { toast } from "sonner";
import { AuthContext } from "@/services/auth/AuthContext";

export default function AddToCartButton({
  product,
  showSpec,
  showQuantity,
}: {
  product: Product;
  showSpec: boolean;
  showQuantity: boolean;
}) {
  const { dict } = useContext(LocaleContext);
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedSpec, setSelectedSpec] = useState(
    product.specs ? product.specs[0] : null
  );
  async function handleAddToCart(product: Product, quantity: number) {
    if (!user) {
      toast.error(dict.product_add_to_cart_toast_message_not_logged_in);
      return;
    }
    const newCart = {
      productId: product.id,
      name: product.name,
      quantity: quantity,
      price: product.price,
      spec: selectedSpec,
    };
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
        productId: product.id!,
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
      }
    }
    toast.success("Added to cart!");
    return;
  }
  return (
    <>
      {/* Right side: Controls (Specs, Quantity, Add to Cart) */}
      <div className="flex flex-col items-end space-y-4">
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
          className="bg-add-to-cart-button-bg-color text-white font-medium p-1 rounded-md transition duration-200 overflow-hidden text-ellipsis"
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
