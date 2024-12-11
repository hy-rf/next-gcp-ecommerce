"use client";

import { CartItem } from "@/model";
import { APIOrderPostBody, UpdateCartItemBody } from "@/model/dto";
import Link from "next/link";
import { useEffect, useState } from "react";
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
import fetchData from "@/lib/fetchData";
import { useRouter } from "next/navigation";

export default function CartItems({ cartItems }: { cartItems: CartItem[] }) {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>(cartItems);
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
    console.log(res);
  };

  async function handlePlusCartItem(cartItem: CartItem) {
    const body: UpdateCartItemBody = {
      id: cartItem.id!,
      productId: cartItem.productId,
      number: 1,
      mode: "plus",
    };
    const res = await fetch("/api/v2/cart-item", {
      method: "put",
      body: JSON.stringify(body),
    }).then((res) => res.json());
    console.log(res);
    (async () => {
      try {
        const cartItems = await fetchData<CartItem[]>("/api/v2/cart-item");
        setCart(cartItems!);
      } catch {
        console.log("No cart item or not log in");
      }
    })();
  }
  async function handleMinusCartItem(cartItem: CartItem) {
    const body: UpdateCartItemBody = {
      id: cartItem.id!,
      productId: cartItem.productId,
      number: 1,
      mode: "minus",
    };
    const res = await fetch("/api/v2/cart-item", {
      method: "put",
      body: JSON.stringify(body),
    }).then((res) => res.json());
    console.log(res);
    (async () => {
      try {
        const cartItems = await fetchData<CartItem[]>("/api/v2/cart-item");
        setCart(cartItems!);
      } catch {
        console.log("No cart item or not log in");
      }
    })();
  }
  async function handleDeleteCartItem(cartItem: CartItem) {
    const res = await fetch("/api/v2/cart-item", {
      method: "delete",
      body: JSON.stringify({
        id: cartItem.id,
      }),
    });
    if (res.status === 200) {
      alert("Delete Success!");
    } else if (res.status === 401) {
      alert("Unauthorized");
    } else if (res.status === 403) {
      alert("Forbidden");
    }
    setCart((old) => old.filter((el) => el.id !== cartItem.id));
  }

  return (
    <Box
      sx={{ padding: "20px", display: "flex", flexDirection: "column", gap: 2 }}
    >
      {cart.map((item, index) => (
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
            image={`${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${item.productId}-0`} // Placeholder image
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
            <Typography color="textSecondary">Price: ${item.price}</Typography>
            {item.spec !== "" && (
              <Typography color="textSecondary">
                Specification: {item.spec}
              </Typography>
            )}
          </CardContent>

          {/* Quantity Section with Plus and Minus Buttons */}
          <CardActions sx={{ flexDirection: "column", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => handleMinusCartItem(item)}
                variant="outlined"
                size="small"
                sx={{
                  minWidth: "32px",
                  height: "32px",
                  padding: 0,
                  fontSize: "1.25rem",
                  lineHeight: 1,
                }}
              >
                -
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
                onClick={() => handlePlusCartItem(item)}
                variant="outlined"
                size="small"
                sx={{
                  minWidth: "32px",
                  height: "32px",
                  padding: 0,
                  fontSize: "1.25rem",
                  lineHeight: 1,
                }}
              >
                +
              </Button>
              <Button
                onClick={() => handleDeleteCartItem(item)}
                variant="outlined"
                size="small"
                sx={{
                  minWidth: "32px",
                  height: "32px",
                  padding: 0,
                  fontSize: "1.25rem",
                  lineHeight: 1,
                  color: "red",
                }}
              >
                x
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
        }}
      >
        Checkout
      </Button>
    </Box>
  );
}
