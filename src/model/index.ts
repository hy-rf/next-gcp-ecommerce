export interface Dictionary {
  title: string;
  layout_title: string;
  user_login: string;
  product_total_1: string;
  product_total_2: string;
  add_to_cart_button_inner_text: string;
  product_sort_sold: string;
  product_sort_price: string;
  product_sort_created: string;
  product_sort_desc: string;
  product_sort_asc: string;
  product_sort_apply: string;
  all_product_link: string;
}

export interface User {
  email: string;
  name: string;
  lastLogin: string;
  password?: string;
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

export interface WishListItem {
  id?: string;
  productId: string;
  userId: string;
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
  createdDate?: Date;
  condition?: number;
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
  spec?: string;
  imageUrl?: string;
}

export interface Order {
  id?: string;
  userId: string;
  total: number;
  createdAt: Date;
  orderItems: OrderItem[];
}

export interface OrderItem {
  productId: string;
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
  status: DeliveryProcessStatus;
}

enum DeliveryProcessStatus {
  pending = 0,
  delivering = 1,
  arrived = 2,
}

export interface tokenPayload {
  userId: string;
  iat?: number;
  exp?: number;
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
  sortOption?: string;
}
