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
  Modal,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CartActionContext,
  CartContext,
  ChangeCartItemMode,
} from "@/services/cart/CartProvider";
import Addresses from "./Addresses";
import LocaleContext from "../component/LocaleContext";
import Image from "next/image";

export default function CartItems() {
  const { dict } = useContext(LocaleContext);
  const cartItems: CartItem[] = useContext(CartContext);
  const { changeCartItem, deleteCartItem } = useContext(CartActionContext);
  const router = useRouter();
  const [selectedCartItem, setSelectedCartItem] = useState<
    Map<number, boolean>
  >(new Map(cartItems.map((_, index) => [index, true])));
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<CartItem | null>(null);
  const [selectedAddress, setSelectedAddress] = useState("");
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
      address: selectedAddress,
    };
    const res = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(postBody),
    });
    if (res.status === 200) {
      router.replace(`/order-success?id=${await res.text()}`);
    }
  };
  if (cartItems.length == 0) {
    return (
      <div className="text-center">
        <p>No items</p>
        <Link
          href={{
            pathname: "/product",
            query: {
              page: 1,
              sort: "sold-desc",
              pagesize: 10,
            },
          }}
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <div id="checkout-wrapper" className="grid gap-4">
        <Box
          sx={{
            padding: "0px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            gridArea: "Cart",
          }}
        >
          {cartItems.map((item, index) => (
            <Card
              className=""
              key={item.id}
              sx={{
                width: "100%",
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
              <div className="flex flex-col md:flex-row w-full">
                {/* Content Section */}
                <CardContent sx={{ flex: 1 }}>
                  <Link href={`/product/${item.productId}`} passHref>
                    <Typography
                      className=" text-ellipsis"
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        cursor: "pointer",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                        lineClamp: 1,
                        WebkitLineClamp: 1,
                        wordBreak: "break-all",
                        wordWrap: "break-word",
                        maxHeight: "2rem",
                        overflow: "hidden",
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
                  className="ml-auto"
                  sx={{ flexDirection: "row", alignItems: "center" }}
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
                      onClick={() => {
                        setItem(item);
                        setOpen(true);
                      }}
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
              </div>
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
              <Addresses setSelectedAddress={setSelectedAddress} />
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
        <Modal
          open={open}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          sx={{
            backgroundColor: "rgba(0 0 0 / 0.3",
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(1px)",
          }}
        >
          <Box
            sx={{
              width: 400,
              margin: 0,
              position: "absolute",
              top: "50%",
              left: "calc(50dvw - 200px)",
              padding: 0,
            }}
          >
            {item && (
              <Card
                key={item.id}
                sx={{
                  maxWidth: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "12px",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e0e0e0",
                  overflow: "hidden",
                }}
              >
                <p>Remove from cart?</p>
                <Box
                  sx={{
                    maxWidth: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
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
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button
                    className="text-red"
                    onClick={() => deleteCartItem(item)}
                  >
                    OK
                  </Button>
                </Box>
              </Card>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}
