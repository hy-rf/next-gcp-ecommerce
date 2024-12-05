import {
  //ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrderRequest,
  OrdersController,
  //PaymentsController,
} from "@paypal/paypal-server-sdk";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  const client = new Client({
    clientCredentialsAuthCredentials: {
      oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
      oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
    },
    timeout: 0,
    environment: Environment.Sandbox,
    logging: {
      logLevel: LogLevel.Info,
      logRequest: { logBody: true },
      logResponse: { logHeaders: true },
    },
  });
  const ordersController = new OrdersController(client);
  //const paymentsController = new PaymentsController(client);
  const { searchParams } = new URL(req.url);
  const orderID = searchParams.get("id") as string;
  if (orderID) {
    console.log(orderID);
    const collect = {
      id: orderID,
      prefer: "return=minimal",
    };
    const res = await ordersController.ordersCapture(collect);
    const body = res.body as string;
    return Response.json(JSON.parse(body));
  }
  // const body: PostBody = await req.json();
  const orderRequest: OrderRequest = {
    intent: CheckoutPaymentIntent.Capture,
    purchaseUnits: [
      {
        amount: {
          currencyCode: "USD",
          value: "100",
        },
      },
    ],
  };
  const collect = {
    body: orderRequest,
    prefer: "return=minimal",
  };

  const res = await ordersController.ordersCreate(collect);
  const body = res.body as string;
  console.log(body);

  return Response.json(JSON.parse(body));
}
