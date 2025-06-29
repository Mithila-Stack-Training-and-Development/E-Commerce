# E-Commerce Backend (Node.js/Express)

## 1. Project Overview
This is the backend API for an e-commerce platform built with Node.js, Express, and MongoDB. It provides user authentication, product management, cart, checkout, order, newsletter subscription, image upload, and full admin management for users, products, and orders.

---

## 2. Folder Structure
```
Backend/
├── config/           # Database connection config (db.js)
├── data/             # Sample data for seeding
├── middleware/       # Custom middleware (auth, admin)
├── models/           # Mongoose schemas (User, Product, Cart, Checkout, Order, Subscriber)
├── routes/           # Express route handlers (userRoutes, productRoutes, cartRoutes, checkoutRoutes, orderRoutes, subscriberRoutes, uploadRoutes, adminRoutes, productAdminRoutes, adminOrderRoutes)
├── seeder.js         # Script to seed database
├── server.js         # Entry point for Express server
├── .env              # Environment variables (not committed)
└── README.md         # Project documentation
```

---

## 3. API Endpoints

### User Routes (`/api/users`)
- **POST /register** – Register a new user
  - Body: `{ name, email, password }`
  - Success: `201`, `{ user, token }`
  - Errors: `400` (exists), `500`

- **POST /login** – Authenticate user
  - Body: `{ email, password }`
  - Success: `200`, `{ user, token }`
  - Errors: `400` (invalid), `500`

- **GET /profile** – Get logged-in user's profile (JWT required)
  - Header: `Authorization: Bearer <token>`
  - Success: `200`, `{ user }`
  - Errors: `401` (unauthorized)

### Product Routes (`/api/products`)
- **POST /** – Create product (Admin only)
  - Body: Product fields (see schema)
  - Header: `Authorization: Bearer <admin token>`
  - Success: `201`, `{ product }`
  - Errors: `401`, `403`, `500`

- **PUT /:id** – Update product (Admin only)
  - Params: `id`
  - Body: Product fields
  - Header: `Authorization: Bearer <admin token>`
  - Success: `200`, `{ product }`
  - Errors: `404`, `401`, `403`, `500`

- **DELETE /:id** – Delete product (Admin only)
  - Params: `id`
  - Header: `Authorization: Bearer <admin token>`
  - Success: `200`, `{ message }`
  - Errors: `404`, `401`, `403`, `500`

- **GET /** – List products (with filters)
  - Query: `collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit`
  - Success: `200`, `[products]`

- **GET /:id** – Get product by ID
  - Params: `id`
  - Success: `200`, `{ product }`
  - Errors: `404`, `500`

- **GET /best-seller** – Get highest rated product
  - Success: `200`, `{ product }`

- **GET /new-arrivals** – Get latest 8 products
  - Success: `200`, `[products]`

- **GET /similar/:id** – Get similar products by gender/category
  - Params: `id`
  - Success: `200`, `[products]`

### Cart Routes (`/api/cart`)
- **POST /** – Add product to cart (guest or user)
  - Body: `{ productId, quantity, size, color, guestId, userId }`
  - Success: `201` (new cart), `200` (updated cart), `{ cart }`
  - Errors: `404` (product/cart not found), `500`

- **PUT /** – Update product quantity in cart
  - Body: `{ productId, quantity, size, color, guestId, userId }`
  - Success: `200`, `{ cart }`
  - Errors: `404` (cart/product not found), `500`

- **DELETE /** – Remove product from cart
  - Body: `{ productId, size, color, guestId, userId }`
  - Success: `200`, `{ cart }`
  - Errors: `404` (cart/product not found), `500`

- **GET /** – Get cart for user or guest
  - Query: `{ userId, guestId }`
  - Success: `200`, `{ cart }`
  - Errors: `404` (cart not found), `500`

- **POST /merge** – Merge guest cart into user cart on login (JWT required)
  - Body: `{ guestId }`
  - Header: `Authorization: Bearer <token>`
  - Success: `200`, `{ cart }`
  - Errors: `400`, `404`, `500`

### Checkout Routes (`/api/checkout`)
- **POST /** – Create a new checkout session (JWT required)
  - Body: `{ shippingAddress, paymentMethod }`
  - Header: `Authorization: Bearer <token>`
  - Success: `201`, `{ session }`
  - Errors: `400`, `401`, `500`

- **PUT /:id/pay** – Mark checkout as paid (JWT required)
  - Params: `id`
  - Body: `{ paymentDetails }`
  - Header: `Authorization: Bearer <token>`
  - Success: `200`, `{ checkout }`
  - Errors: `400`, `401`, `404`, `500`

- **POST /:id/finalize** – Finalize checkout and create order (JWT required)
  - Params: `id`
  - Header: `Authorization: Bearer <token>`
  - Success: `200`, `{ order }`
  - Errors: `400`, `401`, `404`, `500`

### Order Routes (`/api/orders`)
- **GET /my-orders** – Get logged-in user's orders (JWT required)
  - Header: `Authorization: Bearer <token>`
  - Success: `200`, `[orders]`
  - Errors: `401` (unauthorized)

- **GET /:id** – Get order details by ID (JWT required)
  - Params: `id`
  - Header: `Authorization: Bearer <token>`
  - Success: `200`, `{ order }`
  - Errors: `400`, `401`, `404`, `500`

### Newsletter Subscription (`/api/subscribe`)
- **POST /subscribe** – Subscribe to newsletter
  - Body: `{ email }`
  - Success: `201`, `{ message }`
  - Errors: `400` (already subscribed/missing email), `500`

### Image Upload (`/api/upload`)
- **POST /** – Upload an image (Cloudinary)
  - FormData: `image` (file)
  - Success: `200`, `{ imageUrl }`
  - Errors: `400` (no file), `500`

### Admin User Management (`/api/admin/users`)
- **GET /** – Get all users (Admin only)
  - Header: `Authorization: Bearer <admin token>`
  - Success: `200`, `[users]`
  - Errors: `401`, `403`, `500`

- **POST /** – Add a new user (Admin only)
  - Body: `{ name, email, password, role }`
  - Header: `Authorization: Bearer <admin token>`
  - Success: `201`, `{ user }`
  - Errors: `400` (exists), `401`, `403`, `500`

- **PUT /:id** – Update user info (Admin only)
  - Params: `id`
  - Body: `{ name, email, password, role }`
  - Header: `Authorization: Bearer <admin token>`
  - Success: `200`, `{ user }`
  - Errors: `404`, `401`, `403`, `500`

- **DELETE /:id** – Delete a user (Admin only)
  - Params: `id`
  - Header: `Authorization: Bearer <admin token>`
  - Success: `200`, `{ message }`
  - Errors: `404`, `401`, `403`, `500`

### Admin Product Management (`/api/admin/products`)
- **GET /** – Get all products (Admin only)
  - Header: `Authorization: Bearer <admin token>`
  - Success: `200`, `[products]`
  - Errors: `401`, `403`, `500`

### Admin Order Management (`/api/admin/orders`)
- **GET /** – Get all orders (Admin only)
  - Header: `Authorization: Bearer <admin token>`
  - Success: `200`, `[orders]`
  - Errors: `401`, `403`, `500`

- **PUT /:id** – Update order status (Admin only)
  - Params: `id`
  - Body: `{ status }`
  - Header: `Authorization: Bearer <admin token>`
  - Success: `200`, `{ order }`
  - Errors: `400`, `401`, `403`, `404`, `500`

- **DELETE /:id** – Delete an order (Admin only)
  - Params: `id`
  - Header: `Authorization: Bearer <admin token>`
  - Success: `200`, `{ message }`
  - Errors: `404`, `401`, `403`, `500`

---

## 4. Environment Variables
- `MONGO_URI` – MongoDB connection string
- `JWT_SECRET` – Secret for JWT signing
- `PORT` – Server port (default: 3000)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` – For image uploads

---

## 5. Database Schema
- **User**: name, email, password (hashed), role (customer/admin), timestamps
- **Product**: name, description, price, discountPrice, countInStock, sku, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, rating, numReview, tags, user (ref: User), SEO/meta fields, dimensions, weight, timestamps
- **Cart**: user (ref: User), guestId, products (array of cart items: productId, name, image, price, size, color, quantity), totalPrice, timestamps
- **Checkout**: user (ref: User), checkoutItems, shippingAddress, paymentMethod, totalPrice, isPaid, paidAt, paymentStatus, paymentDetails, isFinalized, finalizedAt, timestamps
- **Order**: user (ref: User), orderItems, shippingAddress, paymentMethod, totalPrice, isPaid, paidAt, isDelivered, deliveredAt, paymentStatus, status, timestamps
- **Subscriber**: email, subscribedAt
- **Relationships**:
  - Each product references the user (admin) who created it
  - Each cart references a user or guestId and contains product references
  - Checkout and Order reference user and contain product/order item details

---


## 7. Authentication
- Uses **JWT (JSON Web Token)** for stateless authentication
- On login/register, a JWT is returned
- Protected routes require `Authorization: Bearer <token>` header
- Admin routes require user with `role: admin`
- Cart supports both guest and authenticated users; merging is handled on login
- Checkout and order routes require authentication

---

## 8. Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Loads environment variables
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Enable CORS
- **multer**: File upload handling
- **cloudinary**: Image hosting
- **streamifier**: Buffer to stream conversion for uploads

---

For more details, see the code and comments in each file.
