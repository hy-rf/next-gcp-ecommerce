# Next.js電商

[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/hy-rf/next-gcp-ecommerce/blob/main/README.md)

## 功能

### 產品篩選/排序

可自定義和擴展的產品篩選/排序解決方案。

### 購物車

將產品添加到購物車並更改購物車項目的數量。

### 密碼登錄

在應用程序發布之前，對公眾可用的登錄方法。

### Google 登錄

### 訂單

下訂單。

## 開發/測試中的功能

### OAuth2.0 連接提供者

連接其他 oauth 登錄提供者。

### 產品搜索

## 開始使用

首先，運行開發伺服器：

```bash
npm run dev

# 或

yarn dev

# 或

pnpm dev

# 或

bun dev
```

## API 列表

### 用戶

`POST` `/api/user/login oauth` 登錄

`GET` `/api/user/login-method` 獲取登錄方法

`GET` `/api/user/store` 獲取擁有的商店

`PUT` `/api/user/locale` 更改語言

`GET` `/api/user/token` 獲取新令牌

### 購物車

`GET` `/api/v2/cart-item` 獲取購物車項目

`POST` `/api/v2/cart-item` 添加購物車項目

`PUT` `/api/v2/cart-item` 更改購物車項目

`DELETE` `/api/v2/cart-item` 刪除購物車項目

- **請求主體**:

```json
[
  {
    "id": "string",
    "productId": "string"
  }
]
```

## **響應**

### **成功響應**

- **狀態碼**: 200 OK
- **響應主體**: 一個 JSON 對象，確認刪除購物車項目及其相關產品的更新庫存。

```json
{
  "time": "添加到購物車的時間"
}
```

### **錯誤響應**

- **狀態碼**: 401 未授權

- **原因**: 身份驗證令牌缺失或無效。

- **狀態碼**: 403 禁止

- **原因**: 用戶不擁有該購物車項目。

### 購物車

GET /api/product 獲取產品

- **參數**:

- page: 當前頁碼
- categoryId: 類別的 ID，以 "," 分隔
- subCategoryId: 子類別的 ID，以 "," 分隔
- minPrice: 數字
- maxPrice: 數字
- sort: 排序方式，例如: price-asc

- **響應**:

```json
{
  "pages": "最大頁數",
  "products": ["product1", "product2", "..."],
  "total": "所有頁面中的產品總數"
}
```

`GET` `/api/product/:id` 獲取產品

`POST` `/api/product` 添加產品

`GET` `/api/category` 獲取類別

### 付款

`POST` `/api/pay` 創建 paypal 訂單

`POST` `/api/pay?id=<paypal 訂單 ID>` 向賣家發送款項
