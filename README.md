# E-Commerce powered by Next.js

## Features

### Product filter/sort

Interactive product filter and sort with bookmarkable result.

### Cart

Add product to cart and change quantity of cart items.

### Password login

Login method which is available for public before app publish.

### Google login

## Features in Dev/Test

### Order

Place order.

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

`POST` `/api/user/login` oauth login

`GET` `/api/user/login-method` get login methods

`GET` `/api/user/store` get owned store

`PUT` `/api/user/locale` change locale

`GET` `/api/user/token` get new token

`GET` `/api/v2/cart-item` get cart items

`POST` `/api/v2/cart-item` add cart item

`PUT` `/api/v2/cart-item` change cart item

`GET` `/api/product` get products

#### params:

- page: current page number
- categoryId: ids of categories, separated by ","
- subCategoryId: ids of sub categories, separated by ","
- minPrice: number
- maxPrice: number
- sort: way of sort, ex:price-asc

#### response

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
