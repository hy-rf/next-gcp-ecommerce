import CartItems from "./CartItems";

export default async function Page() {
  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Cart
      </h1>
      <CartItems />
    </div>
  );
}
