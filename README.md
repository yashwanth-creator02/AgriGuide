# AgriGuide 🌾

A full-stack crop advisory system for Indian farmers. AgriGuide provides personalized crop recommendations based on soil data, real-time weather, live market prices, and pest alerts.

---

## Project Structure

```

AgriSuggest/
├── frontend/ # React + TypeScript + Vite
├── backend/ # Node.js + Express + TypeScript
├── database/ # PostgreSQL migrations and schema
└── docs/ # API docs and system design

```

---

## Tech Stack

### Frontend

- React 18, TypeScript, Vite
- Tailwind CSS, shadcn/ui
- React Router, Leaflet.js

### Backend

- Node.js, Express, TypeScript
- PostgreSQL, bcrypt, JWT

### External APIs

- Open-Meteo — Weather
- Nominatim — Reverse geocoding
- data.gov.in — Live mandi prices

---

## Features

- 🌱 **Crop Recommendations** — based on soil type, pH, NPK, season
- 🗺️ **Map Location Picker** — select farm location from interactive map
- 🌤️ **Weather Widget** — real-time weather for farm location
- 💰 **Live Market Prices** — real mandi prices from data.gov.in
- 🐛 **Pest Alerts** — alerts with severity and crop filters
- 📖 **Crop Guide** — detailed info and advisory for each crop
- 📊 **History** — past soil submissions and recommendations
- 🔐 **Authentication** — JWT based login and signup

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL

---

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/AgriSuggest.git
cd AgriSuggest
```

---

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in your values:

```env id="root-env"
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=agriguide
JWT_SECRET=your_jwt_secret
MARKET_API_KEY=your_data_gov_in_api_key
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Set up the database

```bash
psql -U postgres
CREATE DATABASE agriguide;
\c agriguide
\i database/migrations/001_create_farmers.sql
\i database/migrations/002_create_soil_data.sql
\i database/migrations/003_create_recommendations.sql
\i database/migrations/004_create_users.sql
```

---

### 4. Start the backend

```bash
cd backend
npm install
npm run dev
```

---

### 5. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 6. Open the app

```
http://localhost:5173
```

---

## Documentation

- [API Documentation](docs/API_docs.md)
- [System Design](docs/system_design.md)
- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

---

## Database Schema

```
farmers (id, name, email, password, phone, location, created_at)
    │
    ├── soil_data (id, farmer_id, soil_type, ph, nitrogen, phosphorus, potassium, location, season, created_at)
    │       │
    │       └── recommendations (id, farmer_id, soil_id, crop_name, suitability_score, reason, created_at)
```

---

## License

MIT
