# E-Commerce Backend (Node.js/Express)

## 1. Project Overview
This is the backend API for an e-commerce platform built with Node.js, Express, and MongoDB. It provides user authentication, product management, cart functionality, and supports admin/user roles for secure operations.

---

## 2. Folder Structure
```
Backend/
├── config/           # Database connection config (db.js)
├── data/             # Sample data for seeding
├── middleware/       # Custom middleware (auth, admin)
├── models/           # Mongoose schemas (User, Product, Cart)
├── routes/           # Express route handlers (userRoutes, productRoutes, cartRoutes)
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

---

## 4. Environment Variables
- `MONGO_URI` – MongoDB connection string
- `JWT_SECRET` – Secret for JWT signing
- `PORT` – Server port (default: 3000)

---

## 5. Database Schema
- **User**: name, email, password (hashed), role (customer/admin), timestamps
- **Product**: name, description, price, discountPrice, countInStock, sku, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, rating, numReview, tags, user (ref: User), SEO/meta fields, dimensions, weight, timestamps
- **Cart**: user (ref: User), guestId, products (array of cart items: productId, name, image, price, size, color, quantity), totalPrice, timestamps
- **Relationships**:
  - Each product references the user (admin) who created it
  - Each cart references a user or guestId and contains product references

---



## 7. Authentication
- Uses **JWT (JSON Web Token)** for stateless authentication
- On login/register, a JWT is returned
- Protected routes require `Authorization: Bearer <token>` header
- Admin routes require user with `role: admin`
- Cart supports both guest and authenticated users; merging is handled on login

---

## 8. Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Loads environment variables
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Enable CORS

---

For more details, see the code and comments in each file.
