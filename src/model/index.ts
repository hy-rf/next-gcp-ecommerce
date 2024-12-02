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

export interface PaymentMethod {
  name: string;
  userId: string;
  description: string;
}

export interface Address {
  name: string;
  userId: string;
  description: string;
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;

  sold?: number;
  imageUrl: string[];
  categoryId: string;
  subCategoryId: string;
  createdAt: string;
  updatedAt: string;
  createdShopId: string;
  salePrice: number;
  specs?: string[];
}

export interface Review {
  id?: string;
  stars: number;
  productId: string;
  userId: string;
  numberOfUsersLike: string;
}

export interface Category {
  id?: string;
  name: string;
}

export interface SubCategory {
  id?: string;
  name: string;
  categoryId: string;
}

export interface CartItem {
  id?: string;
  productId: string;
  userId?: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  userId: string;
  total: number;
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  cartId: string;
  quantity: number;
  unitPrice: number;
}

export interface StoreSubmission {
  id?: string;
  name: string;
  description: string;
  createdUserId: string;
  submittedAt: string;
  status: string;
}

export interface Store {
  id?: string;
  name: string;
  description: string;
  createdUserId: string;
  ownerUserId: string;
  // coupon?: Coupon[];
}

export interface Coupon {
  name: string;
  description: string;
  storeId: string;
  discount: number;
  discountedProductsId: string[];
  stock: number;
}

export interface DeliveryProcess {
  orderId: string;
  deliveryDetail: string;
}

export interface tokenPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export interface Dictionary {
  title: string;
  layout_title: string;
}

export interface CarouselItem {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface FilterOptions {
  page: number;
  storeId: string;
  categoryId: string;
  subCategoryId: string;
  minPrice: number;
  maxPrice: number;
}
