# E-Commerce Frontend Documentation

This document describes the structure, setup, and main features of the frontend for the MERN stack e-commerce application.

---

## 1. Overview
The frontend is built with **React.js** and communicates with the backend API to provide a seamless shopping experience. It includes user authentication, product browsing, cart management, checkout, and admin dashboards.

---

## 2. Folder Structure (Typical Example)
```
Frontend/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level components (Home, Product, Cart, etc.)
│   ├── redux/         # Redux store, actions, reducers (if using Redux)
│   ├── utils/         # Utility functions and helpers
│   ├── App.js         # Main app component
│   ├── index.js       # Entry point
├── package.json       # Project metadata and dependencies
├── .env               # Frontend environment variables
└── README.md          # Frontend documentation
```

---

## 3. Main Features
- User registration and login (JWT-based)
- Product listing, search, and filtering
- Product details page
- Shopping cart (guest and logged-in users)
- Checkout and order placement
- User profile and order history
- Admin dashboard for managing products, users, and orders
- Responsive design (mobile-friendly)

---

## 4. Environment Variables
- `REACT_APP_API_URL` – Base URL for backend API (e.g., `http://localhost:3000/api`)
- Other variables as needed for third-party integrations (e.g., payment gateways)

---

## 6. Key Dependencies
- **react**: UI library
- **react-router-dom**: Routing
- **redux**, **@reduxjs/toolkit**, **react-redux**: State management (if used)
- **axios**: HTTP requests
- **Tailwind-CSS** : UI styling


---

## 7. Notes
- Ensure the backend server is running and accessible at the API URL specified in `.env`.
- For production, build the app with `npm run build` and deploy the `build/` folder.

---

For more details, see the code and comments in each file.

