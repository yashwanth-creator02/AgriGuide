# AgriSuggest (AgriGuide)

A full-stack crop advisory system for Indian farmers. AgriGuide provides personalized crop recommendations based on soil data, real-time weather, live market prices, and pest alerts.

---

## Project Structure

```
AgriSuggest/
├── frontend/    # React 19 + TypeScript + Vite + Tailwind CSS
├── backend/     # Node.js + Express 5 + TypeScript + PostgreSQL (pg)
├── database/    # PostgreSQL schema, migrations, and seeds
└── docs/        # API docs, architecture specs, and system design
```

---

## Tech Stack

### Frontend
- React 19, TypeScript, Vite
- Tailwind CSS, Radix UI primitives (shadcn/ui pattern)
- React Router v7, Leaflet.js / react-leaflet
- Framer Motion, Lucide React

### Backend
- Node.js, Express 5, TypeScript (ts-node, nodemon)
- PostgreSQL (pg client pool), bcrypt, jsonwebtoken

### External APIs
- Open-Meteo — Forecast & Geocoding
- Nominatim — Reverse geocoding proxy
- data.gov.in — Live mandi prices (Agmarknet)

---

## Features

- **Crop Recommendations** — Suitability scoring based on soil type, pH, NPK levels, and season
- **Map Location Picker** — Select farm location from an interactive Leaflet map with backend reverse-geocoding
- **Weather Widget** — Real-time temperature, humidity, rainfall, and wind speed for farm locations
- **Live Market Prices** — Real mandi prices fetched from data.gov.in
- **Pest Alerts** — Regional pest outbreak warnings with severity rankings and management guidelines
- **Crop Guide** — Public crop catalog with climate requirements, soil criteria, and fertilizer advice
- **Farming History** — Historical soil submissions and generated recommendations
- **Authentication** — Secure JWT-based registration, login, and protected personal farm profiles

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/AgriSuggest.git
cd AgriSuggest
```

---

### 2. Set up environment variables

Create a `.env` file in the repository root:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=agriguide
JWT_SECRET=your_secure_jwt_secret
MARKET_API_KEY=your_data_gov_in_api_key
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Initialize the database and seeds

Run `psql` to create the database, apply the complete schema, and seed baseline crops and pest alerts:

```bash
psql -U postgres -c "CREATE DATABASE agriguide;"
psql -U postgres -d agriguide -f database/schema.sql
psql -U postgres -d agriguide -f database/seeds/seed_crops.sql
psql -U postgres -d agriguide -f database/seeds/seed_pest_alerts.sql
```

Alternatively, run sequential migrations:
```bash
psql -U postgres -d agriguide -f database/migrations/001_create_farmers.sql
psql -U postgres -d agriguide -f database/migrations/002_create_soil_data.sql
psql -U postgres -d agriguide -f database/migrations/003_create_recommendations.sql
psql -U postgres -d agriguide -f database/migrations/004_create_users.sql
psql -U postgres -d agriguide -f database/seeds/seed_crops.sql
psql -U postgres -d agriguide -f database/seeds/seed_pest_alerts.sql
```

---

### 4. Install dependencies

From the repository root:

```bash
npm install
npm run install:all
```

---

### 5. Start the app

One command runs both servers together:

```bash
npm run dev
```

| Shortcut | What it runs |
| --- | --- |
| `npm run dev` | Backend (5000) and frontend (5173) together |
| `npm run dev:backend` | Backend only |
| `npm run dev:frontend` | Frontend only |
| `npm run build` | Production build for both |
| `npm run lint` | Frontend lint |
| `npm run install:all` | Install both dependency trees |

Backend runs on `http://localhost:5000`, frontend on `http://localhost:5173`.

---

## Routing Architecture

- `/` — Landing page with hero and quick actions
- `/crop-info` (aliases: `/crops`, `/crop-guide`) — Public crop library and advisory guide
- `/market-prices` (aliases: `/market`, `/prices`) — Public mandi commodity price monitor
- `/pest-alerts` (aliases: `/pests`, `/alerts`) — Public pest alerts and mitigation steps
- `/soil-input` (aliases: `/soil`, `/advisory`) — Soil analysis form (requires login)
- `/results` — Crop recommendation results for current test
- `/history` — Historical soil tests and recommendations log (requires login)
- `/profile` — Farmer profile management (requires login)
- `/login` / `/signup` — Authentication screens (redirects back to previous location upon login)

---

## Documentation

- [API Documentation](docs/API_docs.md)
- [System Design](docs/system_design.md)
- [File Inventory](docs/FILE_INVENTORY.md)
- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

---

## Database Schema

```
crops (id, name, season, suitable_soil, min_ph, max_ph, min_nitrogen, min_phosphorus, min_potassium, ...)
  │
farmers (id, name, email, password, phone, location, created_at, updated_at)
  │
  ├── soil_data (id, farmer_id, soil_type, ph, nitrogen, phosphorus, potassium, location, season, ...)
  │     │
  │     └── recommendations (id, farmer_id, soil_id, crop_name, suitability_score, reason, soil_snapshot, ...)
  │
pest_alerts (id, pest_name, affected_crop, crop_id, region, severity, description, ...)
```

---

## License

MIT
