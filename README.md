# ShopSphere — React E-Commerce Demo

A basic responsive e-commerce website built with JavaScript, React, React Router, and Context API.

## Features

- Login with User ID/password
- Authentication state through `AuthContext`
- Product data through `ProductContext`
- Product-ID-based cart through `CartContext`
- Quantity increase/decrease/remove
- Coupon state and validation through `CouponContext`
- Men / Women / Kids categories
- Dynamic product route: `/products/:category/:productId`
- Nested routing under `/products`
- Protected routes
- Cart → Coupon → Checkout flow
- Product discount applied before coupon discount
- Responsive UI

## Demo login

- User ID: `demo`
- Password: `shop123`

## Coupons

- `WELCOME10` → 10% off
- `SHOP20` → 20% off
- `KIDS15` → 15% off

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Route structure

- `/login`
- `/products`
- `/products/men`
- `/products/women`
- `/products/kids`
- `/products/:category/:productId`
- `/cart`
- `/checkout`

## Context architecture

```text
AuthProvider
  └── ProductProvider
      └── CartProvider
          └── CouponProvider
              └── App
```

Cart state is persisted to `localStorage`; authentication is persisted to `sessionStorage`.

\n## Production-style catalog\n\nThe catalog is stored separately in `src/data/products.js` and contains 1,500 unique products: 500 each for Men, Women, and Kids. Each product has a unique SKU, brand/collection, product name, description, material, color, sizes, original/sale price, discount, rating, review count, stock, shipping and return metadata, tags, and product photography. Category pages paginate 24 products at a time.\n

## DummyJSON API integration

The product catalog is now loaded from `https://dummyjson.com/products` at runtime.
`src/api/products.js` normalizes the API response into the product shape used by
ShopSphere, while `ProductContext` owns loading, error, and refresh state.

The existing Men/Women navigation is mapped from DummyJSON `mens-*` and `womens-*`
categories. `All Products` exposes the complete API catalog. API prices are displayed
in USD because DummyJSON provides price values without an INR conversion.
