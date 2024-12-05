import fetchData from "@/lib/fetchData";
import { Order } from "@/model";
import { cookies } from "next/headers";
import PaypalPayment from "./PaypalPayment";

export default async function Page() {
  const orders: Order[] = await fetchData<Order[]>(
    `${process.env.URL}/api/order`,
    {
      headers: { Cookie: (await cookies()).toString() },
    }
  );
  return (
    <>
      <h2>Orders list</h2>
      {orders.map((ele) => {
        return (
          <div key={ele.id} className="border rounded-md p-4">
            <p>{ele.id}</p>
            <p>{ele.userId}</p>
            <p>{ele.total}</p>
            {ele.orderItems.map((ele, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-200 hover:bg-gray-300 transform duration-300 p-1"
                >
                  <p>{ele.productId}</p>
                  <p>{ele.quantity}</p>
                  <p>{ele.unitPrice}</p>
                </div>
              );
            })}
            <PaypalPayment order={ele} />
          </div>
        );
      })}
    </>
  );
}
