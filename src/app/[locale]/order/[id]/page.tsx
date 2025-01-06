import { Order, Product } from "@/model";
import PaypalPayment from "../PaypalPayment";
import fetchData from "@/lib/fetchData";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const { id, locale } = params;

  // Get order by id
  const orderResponse = await fetch(`${process.env.URL}/api/order/${id}`);
  // Return not found if order wasn't found
  if (orderResponse.status !== 200) {
    return <p>Not Found</p>;
  }
  // Parse the response body as json
  const orderData = await orderResponse.json();
  // Type Assertion
  const order: Order = orderData as Order;
  const paid = false;

  const products = await Promise.all(
    order.orderItems.map(async (el) => {
      const data = (await fetchData<Product>(
        `${process.env.URL}/api/product/${el.productId}`
      )) as Product;
      return data.name;
    })
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
        {/* Order Header */}
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Order: {params.id}
          </h3>
          <p className="text-lg text-center text-gray-600">
            Total Price:{" "}
            <span className="font-semibold text-gray-800">${order.total}</span>
          </p>
          {order.fireBaseTimeStamp && (
            <p className="text-end">
              {new Date(
                order.fireBaseTimeStamp._seconds * 1000
              ).toLocaleDateString(locale, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
                timeZone: "America/New_York",
              })}
            </p>
          )}
        </div>

        {/* Order Items */}
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 space-y-4">
          {order.orderItems.map((ele, index) => (
            <div
              key={index}
              className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transform transition-all duration-300"
            >
              <Link href={`/product/${ele.productId}`}>
                <p className="text-lg text-center font-medium text-gray-700">
                  {products[index]}
                </p>
              </Link>
              <p className="text-sm text-center text-gray-600">
                Total: <span className="font-semibold">{ele.quantity}</span>{" "}
                items x<span className="font-semibold"> ${ele.unitPrice}</span>{" "}
                per item =
                <span className="font-semibold text-gray-800">
                  {" "}
                  ${ele.quantity * ele.unitPrice}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Delivery Section */}
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mt-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Delivery</h3>
          <p className="text-lg text-gray-600">
            Address: <span className="font-semibold">{order.address}</span>
          </p>
        </div>

        {/* Payment Section */}
        {!paid && (
          <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mt-6">
            <PaypalPayment order={order} />
          </div>
        )}
      </div>
    </>
  );
}
