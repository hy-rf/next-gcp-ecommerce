# E-Commerce powered by Next.js

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

To publish:

## API list

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

---
