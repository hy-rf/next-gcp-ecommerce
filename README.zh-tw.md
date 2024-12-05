# Next.js電商

[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/hy-rf/next-gcp-ecommerce/blob/main/README.md)

## 功能

### 商品排序/過濾

彈性客製化商品排序過濾解決方案。

### 購物車

商品加入購物車，加減數量，從購物車刪除商品。

### 密碼登入

可以用帳號密碼登入與註冊。

### Google 登入

## 開發中

### 訂單

下訂單。

### 連結多個OAuth2.0提供者

### 商品搜尋

## 開始

第一，跑開發server：

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## API列表

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

- page: 頁數
- categoryId: 分類id，以","分隔。
- subCategoryId: 次分類id，以","分隔。
- minPrice: 低價
- maxPrice: 高價
- sort: 排序方式, 例:price-asc

#### 回傳

```json
{
  "pages": "全部頁數",
  "products": ["product1", "product2", "詳見model -> Product"],
  "total": "所有頁數的所有商品數量"
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
