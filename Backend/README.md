# E-Commerce Backend (Node.js/Express)

## Project Overview
This is the backend API for a MERN stack e-commerce platform. It provides user authentication, product management, cart, checkout, order processing, newsletter subscription, image upload, and full admin management for users, products, and orders.

---

## Folder Structure
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

## API Endpoints

### User Routes (`/api/users`)
- `POST /register` – Register a new user
- `POST /login` – Authenticate user
- `GET /profile` – Get logged-in user's profile (JWT required)

### Product Routes (`/api/products`)
- `POST /` – Create product (Admin only)
- `PUT /:id` – Update product (Admin only)
- `DELETE /:id` – Delete product (Admin only)
- `GET /` – List products (with filters)
- `GET /:id` – Get product by ID
- `GET /best-seller` – Get highest rated product
- `GET /new-arrivals` – Get latest 8 products
- `GET /similar/:id` – Get similar products by gender/category

### Cart Routes (`/api/cart`)
- `POST /` – Add product to cart (guest or user)
- `PUT /` – Update product quantity in cart
- `DELETE /` – Remove product from cart
- `GET /` – Get cart for user or guest
- `POST /merge` – Merge guest cart into user cart on login (JWT required)

### Checkout Routes (`/api/checkout`)
- `POST /` – Create a new checkout session (JWT required)
- `PUT /:id/pay` – Mark checkout as paid (JWT required)
- `POST /:id/finalize` – Finalize checkout and create order (JWT required)

### Order Routes (`/api/orders`)
- `GET /my-orders` – Get logged-in user's orders (JWT required)
- `GET /:id` – Get order details by ID (JWT required)

### Newsletter Subscription (`/api/subscribe`)
- `POST /subscribe` – Subscribe to newsletter

### Image Upload (`/api/upload`)
- `POST /` – Upload an image (Cloudinary)

### Admin User Management (`/api/admin/users`)
- `GET /` – Get all users (Admin only)
- `POST /` – Add a new user (Admin only)
- `PUT /:id` – Update user info (Admin only)
- `DELETE /:id` – Delete a user (Admin only)

### Admin Product Management (`/api/admin/products`)
- `GET /` – Get all products (Admin only)

### Admin Order Management (`/api/admin/orders`)
- `GET /` – Get all orders (Admin only)
- `PUT /:id` – Update order status (Admin only)
- `DELETE /:id` – Delete an order (Admin only)

---

## Environment Variables
- `MONGO_URI` – MongoDB connection string
- `JWT_SECRET` – Secret for JWT signing
- `PORT` – Server port (default: 3000)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` – For image uploads

---

## Database Schema
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

## Setup Instructions
1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd E-COMMERCE/Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your variables (see above)
4. Run MongoDB locally or use MongoDB Atlas
5. Start the server (dev):
   ```bash
   npm run dev
   ```
6. (Optional) Seed data:
   ```bash
   node seeder.js
   ```

---

## Authentication
- Uses **JWT (JSON Web Token)** for stateless authentication
- On login/register, a JWT is returned
- Protected routes require `Authorization: Bearer <token>` header
- Admin routes require user with `role: admin`
- Cart supports both guest and authenticated users; merging is handled on login
- Checkout and order routes require authentication

---

## Dependencies
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
