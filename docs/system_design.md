# AgriGuide — System Design

## Overview

AgriGuide is a full-stack crop advisory system that helps Indian farmers make informed decisions about crop selection based on soil data, weather conditions, and market prices. It includes user authentication, real-time weather, live market prices, and a history of past analyses.

---

## Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │  HTTP   │                 │  SQL    │                 │
│   Frontend      │ ──────► │   Backend       │ ──────► │   PostgreSQL    │
│   React + Vite  │         │   Node + Express│         │   Database      │
│   Port 5173     │         │   Port 5000     │         │   agriguide     │
│                 │ ◄────── │                 │ ◄────── │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                    │
                                    │ External APIs
                                    ▼
                        ┌───────────────────────┐
                        │  Open-Meteo API        │
                        │  (Weather + Geocoding) │
                        │                        │
                        │  Nominatim API         │
                        │  (Reverse Geocoding)   │
                        │                        │
                        │  data.gov.in API       │
                        │  (Live Market Prices)  │
                        └───────────────────────┘
```

---

## Frontend

**Stack:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, Leaflet.js

### Pages

| Page          | Route            | Auth Required | Description                                |
| ------------- | ---------------- | ------------- | ------------------------------------------ |
| Home          | `/`              | No            | Landing page with feature overview         |
| Soil Input    | `/soil-input`    | Yes           | Form to enter soil data with map picker    |
| Results       | `/results`       | Yes           | Crop recommendations + weather widget      |
| Crop Guide    | `/crop-info`     | Yes           | Crop info and advisory with tabs           |
| Market Prices | `/market-prices` | Yes           | Live mandi prices with search filter       |
| Pest Alerts   | `/pest-alerts`   | Yes           | Pest alerts with severity and crop filters |
| History       | `/history`       | Yes           | Past soil submissions and recommendations  |
| Login         | `/login`         | No            | User login page                            |
| Signup        | `/signup`        | No            | User registration page                     |
| Not Found     | `*`              | No            | 404 page                                   |

### Key Components

- `Navbar` — sticky top navigation with profile dropdown (History + Logout)
- `Layout` — shell wrapper with Navbar and Outlet
- `ProtectedRoute` — redirects to login if not authenticated
- `MapPicker` — interactive Leaflet map for location selection
- `WeatherWidget` — displays current weather for selected location
- `ResultCard` — displays a single crop recommendation
- `CropCard` — displays crop summary info
- `AlertBanner` — displays pest alert with severity badge

### Services

- `authService.ts` — login, signup, logout, token management
- `cropService.ts` — fetch crop data from backend
- `weatherService.ts` — fetch weather data from backend
- `marketService.ts` — fetch market prices, recommendations, soil data, history

### Hooks

- `useWeather` — fetches weather data for a given location
- `useCropRecommend` — fetches crop recommendations from backend

---

## Backend

**Stack:** Node.js, Express, TypeScript, PostgreSQL (pg), bcrypt, jsonwebtoken

### Folder Structure

```
src/
├── config/        # DB connection and env variables
├── controllers/   # Route handlers
├── middleware/    # Auth, error handling, validation
├── routes/        # Express routers
├── services/      # Business logic and external APIs
└── types/         # TypeScript interfaces
```

### API Endpoints

| Method | Endpoint              | Auth | Description                        |
| ------ | --------------------- | ---- | ---------------------------------- |
| POST   | /api/auth/signup      | No   | Register new farmer                |
| POST   | /api/auth/login       | No   | Login farmer                       |
| GET    | /api/auth/me          | Yes  | Get current farmer                 |
| GET    | /api/farmers          | No   | Get all farmers                    |
| POST   | /api/farmers          | No   | Create farmer                      |
| GET    | /api/soil             | No   | Get all soil data                  |
| POST   | /api/soil             | No   | Save soil data                     |
| GET    | /api/soil/history/:id | No   | Get soil + recommendations history |
| POST   | /api/recommendations  | No   | Get crop recommendations           |
| GET    | /api/crops            | No   | Get all crops                      |
| GET    | /api/weather          | No   | Get weather by location            |
| GET    | /api/market           | No   | Get live market prices             |

### Middleware

- `authMiddleware` — verifies JWT token for protected routes
- `errorHandler` — global error handler
- `validateRequest` — validates soil input data

---

## Database

**Stack:** PostgreSQL

### Tables

#### farmers

| Column     | Type      | Description                   |
| ---------- | --------- | ----------------------------- |
| id         | SERIAL    | Primary key                   |
| name       | VARCHAR   | Farmer name                   |
| email      | VARCHAR   | Unique email (used for login) |
| password   | VARCHAR   | Bcrypt hashed password        |
| phone      | VARCHAR   | Phone number                  |
| location   | VARCHAR   | Farm location                 |
| created_at | TIMESTAMP | Record created time           |

> Note: `farmers` and `users` are the same table. Authentication is built directly into the farmers table.

#### soil_data

| Column     | Type      | Description              |
| ---------- | --------- | ------------------------ |
| id         | SERIAL    | Primary key              |
| farmer_id  | INTEGER   | Foreign key to farmers   |
| soil_type  | VARCHAR   | Type of soil             |
| ph         | DECIMAL   | pH level (0-14)          |
| nitrogen   | DECIMAL   | Nitrogen content kg/ha   |
| phosphorus | DECIMAL   | Phosphorus content kg/ha |
| potassium  | DECIMAL   | Potassium content kg/ha  |
| location   | VARCHAR   | Farm location            |
| season     | VARCHAR   | Kharif / Rabi / Zaid     |
| created_at | TIMESTAMP | Record created time      |

#### recommendations

| Column            | Type      | Description               |
| ----------------- | --------- | ------------------------- |
| id                | SERIAL    | Primary key               |
| farmer_id         | INTEGER   | Foreign key to farmers    |
| soil_id           | INTEGER   | Foreign key to soil_data  |
| crop_name         | VARCHAR   | Recommended crop          |
| suitability_score | DECIMAL   | Score out of 100          |
| reason            | TEXT      | Reason for recommendation |
| created_at        | TIMESTAMP | Record created time       |

---

## Authentication Flow

```
User Signup → Hash password (bcrypt) → Save to farmers table → Return JWT token
User Login → Find farmer by email → Compare password → Return JWT token
Protected Route → Verify JWT token → Allow access
```

JWT tokens expire after 7 days. Tokens are stored in localStorage on the frontend.

---

## Crop Recommendation Algorithm

The scoring algorithm evaluates each crop against the soil data:

| Factor                | Points  |
| --------------------- | ------- |
| Season match          | 30      |
| pH range match        | 25      |
| Soil type match       | 20      |
| Nitrogen sufficient   | 10      |
| Phosphorus sufficient | 10      |
| Potassium sufficient  | 5       |
| **Total**             | **100** |

Top 3 crops by score are returned as recommendations and saved to the database.

---

## External APIs

| API                       | Purpose                               | Cost |
| ------------------------- | ------------------------------------- | ---- |
| Open-Meteo                | Weather forecast                      | Free |
| Open-Meteo Geocoding      | City to coordinates                   | Free |
| Nominatim (OpenStreetMap) | Coordinates to city name (map picker) | Free |
| data.gov.in Agmarknet     | Live mandi market prices              | Free |

---

## Future Plans

- Mobile responsive refinements
- Farmer dashboard with analytics
- More crop varieties
- NIPHM pest alerts integration
- Push notifications for pest alerts

```

Let me know when you've updated both files!
```
