# Beneficial Plastics

Full-stack e-commerce website for Beneficial Plastics.

## Project Structure
```
beneficialplastics/
├── frontend/     React.js (Vite)  → http://localhost:5173
├── backend/      Node.js Express  → http://localhost:5000
└── admin/        HTML Admin Panel → open admin/index.html in browser (or use Live Server)
```

## Prerequisites
- Node.js 18+
- MongoDB running locally on port 27017 (or update MONGODB_URI in backend/.env)

## Setup & Run

### 1. Backend
```bash
cd backend
npm run dev
```
Server starts on http://localhost:5000
Admin user auto-seeded: admin@beneficialplastics.com.au / Admin@123

### 2. Frontend
```bash
cd frontend
npm run dev
```
Opens on http://localhost:5173

### 3. Admin Panel
Open `admin/index.html` in your browser (use VS Code Live Server extension or any static server).
Login with: admin@beneficialplastics.com.au / Admin@123

## Environment Variables

### backend/.env
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/beneficialplastics
JWT_SECRET=bp_secret_key_2024_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
ADMIN_EMAIL=admin@beneficialplastics.com.au
ADMIN_PASSWORD=Admin@123
```

### frontend/.env
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints
- POST   /api/auth/login
- POST   /api/auth/register
- GET    /api/products
- GET    /api/products/:slug
- POST   /api/products          (admin)
- PUT    /api/products/:id      (admin)
- DELETE /api/products/:id      (admin)
- GET    /api/categories
- POST   /api/categories        (admin)
- POST   /api/quotes
- GET    /api/quotes            (admin)
- PUT    /api/quotes/:id        (admin)
