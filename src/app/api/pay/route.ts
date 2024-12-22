import { Order } from "@/model";
import {
  //ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  OrderCaptureRequest,
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

  // OrderID is that paypal treats this order with unique identifier that will be used at payment
  const orderID = searchParams.get("id") as string;
  // capture order(move money to seller who checked the order) if orderID was sent
  if (orderID) {
    const collect: {
      id: string;
      paypalRequestId?: string;
      prefer?: string;
      paypalClientMetadataId?: string;
      paypalAuthAssertion?: string;
      body?: OrderCaptureRequest;
    } = {
      id: orderID,
      prefer: "return=minimal",
    };
    const res = await ordersController.ordersCapture(collect);
    // TODO: parse res then update order in firestore to paid if payment succeed
    const bodyres = res.body as string;
    return Response.json(JSON.parse(bodyres));
  }
  // create order if orderID wasn't sent
  const orderRequest: OrderRequest = {
    intent: CheckoutPaymentIntent.Capture,
    purchaseUnits: [
      {
        amount: {
          currencyCode: "USD",
          value: order.total.toString(),
        },
        payee: {
          emailAddress: "sb-pywkw34654204@business.example.com",
        },
      },
    ],
    applicationContext: {
      brandName: "test",
      locale: "jp-JP",
    },
  };
  const collect = {
    body: orderRequest,
    prefer: "return=minimal",
  };

  const res = await ordersController.ordersCreate(collect);
  const bodyres = res.body as string;
  return Response.json(JSON.parse(bodyres));
}
