import fetchData from "@/lib/fetchData";
import { Order } from "@/model";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const orders: Order[] = (await fetchData<Order[]>(
    `${process.env.URL}/api/order`,
    {
      headers: { Cookie: (await cookies()).toString() },
    }
  )) as Order[];
  return (
    <>
      <h2>Orders list</h2>
      {orders.map((ele) => {
        return (
          <div key={ele.id} className="border rounded-md p-4">
            <Link href={`/order/${ele.id}`}>To order detail</Link>
            <p>Total Price: {ele.total}</p>
            {ele.orderItems.map((ele, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-200 hover:bg-gray-300 transform duration-300 p-1"
                >
                  <p className="text-center">{ele.productId}</p>
                  <p className="text-center">
                    Total: {ele.quantity} items x ${ele.unitPrice} per item = $
                    {ele.quantity * ele.unitPrice}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
