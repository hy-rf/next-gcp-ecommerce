"use client";

import "./CartItems.css";
import { CartItem } from "@/model";
import { APIOrderPostBody } from "@/model/dto";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CartActionContext,
  CartContext,
  ChangeCartItemMode,
} from "@/services/cart/CartProvider";
import Addresses from "./Addresses";
import LocaleContext from "../_component/LocaleContext";
import Image from "next/image";

export default function CartItems() {
  const { dict } = useContext(LocaleContext);
  const cartItems: CartItem[] = useContext(CartContext);
  const { changeCartItem, deleteCartItem } = useContext(CartActionContext);
  const router = useRouter();
  const [selectedCartItem, setSelectedCartItem] = useState<
    Map<number, boolean>
  >(new Map(cartItems.map((_, index) => [index, true])));

  useEffect(() => {
    setSelectedCartItem(new Map(cartItems.map((_, index) => [index, true])));
  }, [cartItems]);

  const toggleItemSelection = (index: number) => {
    setSelectedCartItem((prev) => {
      const newMap = new Map(prev);
      newMap.set(index, !newMap.get(index)); // Toggle the selection
      return newMap;
    });
  };

  const getSelectedItems = () => {
    return cartItems.filter((_, index) => selectedCartItem.get(index));
  };

  const handlePlaceOrder = async () => {
    const selectedItems = getSelectedItems();
    if (selectedItems.length < 1) {
      toast.error("No selected cart items");
      return;
    }
    const postBody: APIOrderPostBody = {
      cartItems: selectedItems,
    };
    const res = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(postBody),
    });
    if (res.status === 200) {
      router.replace(`/order-success?id=${await res.text()}`);
    }
  };

  return (
    <>
      <div id="checkout-wrapper" className="grid">
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            gridArea: "Cart",
          }}
        >
          {cartItems.map((item, index) => (
            <Card
              key={item.id}
              sx={{
                maxWidth: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: "12px",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e0e0e0",
                overflow: "hidden",
              }}
            >
              {/* Placeholder for Product Image */}
              <CardMedia
                component="img"
                image={`${"https://storage.googleapis.com/3596b15827ad/product/"}${item.productId}-0`} // Placeholder image
                alt="Product Placeholder"
                sx={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  margin: "8px",
                }}
              />

              {/* Content Section */}
              <CardContent sx={{ flex: 1 }}>
                <Link href={`/product/${item.productId}`} passHref>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      cursor: "pointer",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {item.name}
                  </Typography>
                </Link>
                <Typography color="textSecondary">
                  Price: ${item.price}
                </Typography>
                {item.spec !== "" && (
                  <Typography color="textSecondary">
                    Specification: {item.spec}
                  </Typography>
                )}
              </CardContent>

              {/* Quantity Section with Plus and Minus Buttons */}
              <CardActions
                sx={{ flexDirection: "column", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={() =>
                      changeCartItem(item, ChangeCartItemMode.Minus)
                    }
                    variant="outlined"
                    size="small"
                    sx={{
                      minWidth: "32px",
                      height: "32px",
                      padding: 0,
                      fontSize: "1.25rem",
                      lineHeight: 1,
                      borderColor: "#5a5a5a",
                    }}
                  >
                    <Image
                      src={"/minus.svg"}
                      alt={"minus"}
                      width={32}
                      height={32}
                    ></Image>
                  </Button>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "40px",
                      textAlign: "center",
                      border: "1px solid #e0e0e0",
                      borderRadius: "4px",
                      padding: "2px 0",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    {item.quantity}
                  </Typography>
                  <Button
                    onClick={() =>
                      changeCartItem(item, ChangeCartItemMode.Plus)
                    }
                    variant="outlined"
                    size="small"
                    sx={{
                      minWidth: "32px",
                      height: "32px",
                      padding: 0,
                      fontSize: "1.25rem",
                      lineHeight: 1,
                      borderColor: "#5a5a5a",
                    }}
                  >
                    <Image
                      src={"/plus.svg"}
                      alt={"plus"}
                      width={32}
                      height={32}
                    ></Image>
                  </Button>
                  <Button
                    onClick={() => deleteCartItem(item)}
                    variant="outlined"
                    size="small"
                    sx={{
                      minWidth: "32px",
                      height: "32px",
                      padding: 0,
                      fontSize: "1.25rem",
                      lineHeight: 1,
                      color: "red",
                      borderColor: "red",
                    }}
                  >
                    <Image
                      src={"/x.svg"}
                      alt={"remove"}
                      width={26}
                      height={26}
                    ></Image>
                  </Button>
                </Box>
              </CardActions>

              {/* Checkbox Section */}
              <CardActions>
                <Checkbox
                  checked={selectedCartItem.get(index) || false}
                  onChange={() => toggleItemSelection(index)}
                  sx={{
                    "&.Mui-checked": {
                      color: "primary.main",
                    },
                  }}
                />
              </CardActions>
            </Card>
          ))}
        </Box>
        {cartItems.length > 0 && (
          <>
            <div
              style={{
                gridArea: "Addresses",
              }}
            >
              <Addresses />
            </div>
            <div
              className="flex flex-col p-4 gap-2"
              style={{
                gridArea: "Payment",
              }}
            >
              Payments
              <input type="checkbox" />
              <label htmlFor="">Credit card</label>
              <label htmlFor="">Paypal</label>
              <input type="checkbox" />
              <label htmlFor="">3rd</label> <input type="checkbox" />
              <label htmlFor="">4th</label> <input type="checkbox" />
              <label htmlFor="">5th</label> <input type="checkbox" />
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handlePlaceOrder}
              sx={{
                alignSelf: "center",
                mt: 3,
                px: 5,
                borderRadius: "12px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                textTransform: "none",
                gridArea: "CheckoutButton",
              }}
            >
              {dict.cart_checkout_button_inner_text}
            </Button>
          </>
        )}
      </div>
    </>
  );
}
