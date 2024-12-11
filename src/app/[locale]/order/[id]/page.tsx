import { Order } from "@/model";
import PaypalPayment from "../PaypalPayment";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const order: Order = await fetch(`${process.env.URL}/api/order/${id}`).then(
    (res) => res.json()
  );
  const paid = false;
  return (
    <>
      <h3>Order: {params.id}</h3>
      <p className="text-center">Total Price: {order.total}</p>
      {order.orderItems.map((ele, index) => {
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
      {!paid && <PaypalPayment order={order} />}
    </>
  );
}
