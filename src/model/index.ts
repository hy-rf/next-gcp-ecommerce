export interface User {
  email: string;
  name: string;
  lastLogin: string;
}

export interface UserLoginMethod {
  method: string;
  userId: string;
  providerUserId: string;
}

export interface UserPaymentMethodDetail {
  id: string;
  paymentMethodId: string;
  userId: string;
  detail: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
}

export interface UserShippingInfo {
  id: string;
  userId: string;
  shippingMethodId: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string[];
  categoryId: string;
  subCategoryId: string;
  createdAt: Date;
  updatedAt: Date;
  createdShopId: string;
  salePrice: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface CartItem {
  id: string;
  productId: string;
  cartId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  cartId: string;
  quantity: number;
  unitPrice: number;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  createdUserId: string;
  ownerUserId: string;
  coupon: Coupon[];
}

export interface Coupon {
  id: string;
  name: string;
  description: string;
  storeId: string;
  discount: number;
  discountedProductsId: string[];
  stock: number;
}

export interface DeliveryProcess {
  id: string;
  orderId: string;
  deliveryDetail: string;
}