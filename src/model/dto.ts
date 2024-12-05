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

export interface CartItemViewModel {
  id?: string;
  productId: string;
  userId?: string;
  name: string;
  quantity: number;
  price: number;
  spec?: string;
  imageUrl: string;
}
