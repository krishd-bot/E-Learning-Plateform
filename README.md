# Dudemy — Full-Stack E-Learning Platform

A complete MERN-stack Learning Management System with authentication, course
and lecture management, enrollment with progress tracking, wishlists,
ratings & reviews, certificates, an admin dashboard, and dark mode.

## Features

- 🔐 JWT auth (register/login/logout), profile editing with avatar upload,
  change/forgot/reset password
- 📚 Course catalog with search, category & level filters, and sorting
- 🎬 Lecture management (add/edit/delete lectures per course, admin only)
- 📈 Per-lecture progress tracking for enrolled students
- 🎓 Auto-issued certificates once a course reaches 100% completion,
  printable/exportable as PDF from the browser
- ❤️ Wishlist
- ⭐ Ratings & reviews per course
- 💳 Simulated checkout flow for paid courses (no real payment gateway keys
  required — swap in Stripe/Razorpay later if you want real payments)
- 📊 Admin dashboard with revenue chart, enrollment stats, and top courses
- 🌗 Light/Dark mode
- 📱 Fully responsive UI (Tailwind CSS + daisyUI)

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Multer
**Frontend:** React 18, Vite, Redux Toolkit, React Router, Tailwind CSS,
daisyUI, Axios, Chart.js, react-hot-toast

## Project Structure

```
├── backend/       Express API server
└── client/        React (Vite) frontend
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database — either local (`mongod`) or a free
  [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env and set MONGO_URI and JWT_SECRET
npm run seed   # optional: creates a demo admin + student and 6 sample courses
npm run dev    # starts the API on http://localhost:5000
```

Demo accounts created by `npm run seed`:

- Admin: `admin@dudemy.com` / `admin123`
- Student: `student@dudemy.com` / `student123`

### 2. Frontend Setup

```bash
cd client
npm install
cp .env.example .env   # optional, defaults to /api/v1 via Vite proxy
npm run dev    # starts the app on http://localhost:5173
```

The Vite dev server proxies `/api` and `/uploads` requests to
`http://localhost:5000`, so both servers need to be running.

### 3. Build for production

```bash
cd client
npm run build     # outputs static files to client/dist
```

Serve `client/dist` with any static host, and deploy `backend/` to any
Node hosting provider (Render, Railway, a VPS, etc.), pointing
`CLIENT_URL` in the backend `.env` at your deployed frontend URL.

## Notes on the payment flow

There's no real payment gateway wired in, since that requires live API
keys that can't be provided in a template project. The checkout flow in
`backend/controllers/payment.controller.js` and
`client/src/Pages/Payment.jsx` simulates a full checkout (create order →
confirm → enroll) using the same shape a real Stripe/Razorpay integration
would use, so swapping in a real provider later is a small, contained change.

## Notes on file uploads

Avatars and course thumbnails are stored locally on disk under
`backend/uploads` and served statically — no cloud storage account is
required to run this project out of the box.
