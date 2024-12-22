import { Order } from "@/model";
import {
  //ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  OrderRequest,
  OrdersController,
  //PaymentsController,
} from "@paypal/paypal-server-sdk";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  // order will be used to check ship info, seller info, and update order status if needed
  const order: Order = await req.json();
  console.log(order);

  //const paymentsController = new PaymentsController(client);
  const { searchParams } = new URL(req.url);
  const orderID = searchParams.get("id") as string;
  const client = new Client({
    clientCredentialsAuthCredentials: {
      oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
      oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
    },
    timeout: 0,
    environment: Environment.Sandbox,
    // logging: {
    //   logLevel: LogLevel.Info,
    //   logRequest: { logBody: true },
    //   logResponse: { logHeaders: true },
    // },
  });
  const ordersController = new OrdersController(client);
  if (orderID) {
    // capture order(move money to seller who checked the order) if orderID was sent
    const collect = {
      id: orderID,
      prefer: "return=minimal",
    };
    const res = await ordersController.ordersCapture(collect);
    // TODO: parse res then update order in firestore to paid if payment succeed
    const bodyres = res.body as string;
    return Response.json(JSON.parse(bodyres));
  }
  // create order if orderID wasn't sent
  const body: Order = await req.json();
  const orderRequest: OrderRequest = {
    intent: CheckoutPaymentIntent.Capture,
    purchaseUnits: [
      {
        amount: {
          currencyCode: "USD",
          value: body.total.toString(),
        },
        payee: {
          emailAddress: "sb-pywkw34654204@business.example.com",
        },
      },
    ],
  };
  const collect = {
    body: orderRequest,
    prefer: "return=minimal",
  };

  const res = await ordersController.ordersCreate(collect);
  const bodyres = res.body as string;
  return Response.json(JSON.parse(bodyres));
}
