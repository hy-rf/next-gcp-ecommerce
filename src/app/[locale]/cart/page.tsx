import fetchData from "@/lib/fetchData";
import { CartItem } from "@/model";
import { cookies } from "next/headers";
import Link from "next/link";
import CartItemList from "./CartItems";

export default async function Page() {
  /* eslint-disable prefer-const */

  let cartItems: CartItem[];
  cartItems = await fetchData<CartItem[]>(
    `${process.env.URL}/api/v2/cart-item`,
    {
      headers: { Cookie: (await cookies()).toString() },
    }
  );

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty!</h1>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Cart
      </h1>
      <div className="grid gap-6 grid-cols-1">
        <CartItemList cartItems={cartItems} />
      </div>
    </div>
  );
}
