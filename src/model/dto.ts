import { CartItem } from ".";

export interface UpdateCartItemBody {
  id: string;
  productId: string;
  number: number;
  mode: string;
}

export interface R {
  success: boolean;
  message: string;
}

export interface APIOrderPostBody {
  cartItems: CartItem[];
}
