# E-Commerce powered by Next.js

[![zh-tw](https://img.shields.io/badge/lang-zh--tw-green.svg)](https://github.com/hy-rf/next-gcp-ecommerce/blob/main/README.zh-tw.md)

## Features

### Localization

### SEO

### Product filter/sort

Customizable and expandable product filter/sort solution.

### Cart

Add product to cart and change quantity of cart items.

### Password login

Login method which is available for public before app publish.

### Google login

### Order

Place order.

## Features in Dev/Test

### OAuth2.0 Link providers

Link other oauth login providers

### Product search

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## API list

### User

`POST` `/api/user/login` oauth login

`GET` `/api/user/login-method` get login methods

`GET` `/api/user/store` get owned store

`PUT` `/api/user/locale` change locale

`GET` `/api/user/token` Get new token, it is used when other api requests failed for expired token.

### Cart

`GET` `/api/v2/cart-item` get cart items

`POST` `/api/v2/cart-item` add cart item

`PUT` `/api/v2/cart-item` change cart item

`DELETE` `/api/v2/cart-item` delete cart item

- **Request body**:

```json
[
  {
    "id": "string",
    "productId": "string"
  }
]
```

## **Response**

### **Successful Response**

- **Status Code**: `200 OK`
- **Response Body**: A JSON object confirming the deletion of the cart item and the updated stock of the associated product.

```json
{
  "time": "add to cart time"
}
```

### **Error Responses**

- **Status Code**: `401 Unauthorized`

- **Reason**: Authentication token is missing or invalid.

- **Status Code**: `403 Forbidden`

- **Reason**: The user does not own the cart item.

### Cart

`GET` `/api/product` get products

- **Params**:

- page: current page number
- categoryId: ids of categories, separated by ","
- subCategoryId: ids of sub categories, separated by ","
- minPrice: number
- maxPrice: number
- sort: way of sort, ex:price-asc

- **Response**:

```json
{
  "pages": "max number of pages",
  "products": ["product1", "product2", "..."],
  "total": "numbers of all products in all pages"
}
```

`GET` `/api/product/:id` get product

`POST` `/api/product` add product

`GET` `/api/category` get categories

### Payment

`POST` `/api/pay` create paypal order

`POST` `/api/pay?id=<paypal order id>` send money to seller

<!-- ## API list

### User

#### User login

- **Endpoint**: `/user/login/api`
- **Description**: User login and get login result.
- **Request Body**:
  ```json
  {
    "id": "user id from oauth provider",
    "oauth_provider": "provider name"
  }
  ```
- **Response**:
  ```json
  {
    "code": "200/300/400",
    "message": "string"
  }
  ```

### Store

#### Get stores owned by certain user

- **Endpoint**: `/user/store/api`
- **Method**: `GET`
- **Description**: Get stores owned by authenticated user.
- **Parameters**: None
- **Response**:
  ```json
  [
    {
      "name": "string",
      "description": "string",
      "createdUserId": "string",
      "ownerUserId": "string"
    }
  ]
  ```

---

#### Get all store submissions

- **Endpoint**: `/store-submission/api`
- **Method**: `GET`
- **Description**: Get stores submissions by all user.
- **Parameters**:
  ```json
  [{}, {}]
  ```

---

#### Get stores by given id

- **Endpoint**: `/store/api`
- **Method**: `GET`
- **Description**: Get stores owned by authenticated user.
- **Parameters**: `id:string`
- **Response**:
  ```json
  {
    "name": "string",
    "description": "string",
    "createdUserId": "string",
    "ownerUserId": "string"
  }
  ```

### Cart

#### Get cart items by cart id

- **Endpoint**: `/cart/cartitem/api`
- **Method**: `GET`
- **Description**: Get cart item in certain cart.
- **Parameters**: `id:string`
- **Response**:
  ```json
  {
    "name": "string",
    "description": "string",
    "createdUserId": "string",
    "ownerUserId": "string"
  }
  ```

--- -->
