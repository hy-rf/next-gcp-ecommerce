import fetchData from "@/lib/fetchData";
import { CartItem, Product } from "@/model";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface CartItemPayload {
  product: Product;
  quantity: number;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await fetchData<CartItem[]>("/api/v2/cart-item"); // Adjust API endpoint
    return response;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<CartItemPayload>) => {
      const item = state.cartItems.find(
        (el) => el.productId === action.payload.product.id
      );
      if (item) {
        item.quantity++;
      } else {
        const newCartItem: CartItem = {
          productId: action.payload.product.id ?? "undefined",
          name: action.payload.product.name,
          quantity: action.payload.quantity,
          price: action.payload.product.price,
        };
        state.cartItems.push(newCartItem);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.cartItems = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart items.";
      });
  },
});

export const { increment } = cartSlice.actions;

export default cartSlice.reducer;
