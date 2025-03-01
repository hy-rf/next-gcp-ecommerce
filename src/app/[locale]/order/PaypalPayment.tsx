"use client";
import React, { useContext, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { Order } from "@/model";
import LocaleContext from "../component/LocaleContext";
import { toast } from "sonner";

// Renders errors or successfull transactions on the screen.
function Message({ content }: { content: string }) {
  return <p>{content}</p>;
}

function PaypalPayment({ order }: { order: Order }) {
  const initialOptions: ReactPayPalScriptOptions = {
    clientId:
      "AdAwNGwtEh9YZNq30hDpOwVXgcjU4Avq1p8Ulf3J6mKKHG_gSQRiweYoKTHfcd76NnIrROzy5iQYwl1i",
    disableFunding: "credit",
    buyerCountry: "US",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
  };

  const [message, setMessage] = useState("");
  const { dict } = useContext(LocaleContext);
  return (
    <div>
      <div className="text-center -z-40">
        <h5>{dict.order_payment_paypal_test_account_text}</h5>
      </div>
      <p>Email:sb-vl4gr34366980@personal.example.com</p>
      <p>Password:EFKTh#7a</p>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "silver",
            label: "paypal",
          }}
          createOrder={async () => {
            try {
              const response = await fetch("/api/pay", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
              });

              const orderData = await response.json();

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(`/api/pay?id=${data.orderID}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
              });

              const orderData = await response.json();

              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
                toast.success(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`
              );
              toast.error(
                `Sorry, your transaction could not be processed...${error}`
              );
            }
          }}
          onCancel={async () => {
            toast.info("Payment canceled!");
          }}
          onClick={async () => {
            toast.info("Transaction begin");
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default PaypalPayment;
