# AgriGuide — System Design

## Overview

AgriGuide is a full-stack crop advisory system that helps farmers make informed decisions about crop selection based on soil data, weather conditions, and market prices.

---

## Architecture

```

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ │ HTTP │ │ SQL │ │
│ Frontend │ ──────► │ Backend │ ──────► │ PostgreSQL │
│ React + Vite │ │ Node + Express│ │ Database │
│ Port 5173 │ │ Port 5000 │ │ agriguide │
│ │ ◄────── │ │ ◄────── │ │
└─────────────────┘ └─────────────────┘ └─────────────────┘
│
│ External APIs
▼
┌───────────────────────┐
│ Open-Meteo API │
│ (Weather + Geocoding) │
│ │
│ Nominatim API │
│ (Reverse Geocoding) │
│ │
│ data.gov.in (planned) │
│ (Market Prices) │
└───────────────────────┘

```

---

## Frontend

**Stack:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, Leaflet.js

### Pages

| Page          | Route            | Description                        |
| ------------- | ---------------- | ---------------------------------- |
| Home          | `/`              | Landing page with feature overview |
| Soil Input    | `/soil-input`    | Form to enter soil data            |
| Results       | `/results`       | Crop recommendations + weather     |
| Advisory      | `/advisory`      | Detailed crop farming advice       |
| Crop Info     | `/crop-info`     | General crop information           |
| Market Prices | `/market-prices` | Current crop market prices         |
| Pest Alerts   | `/pest-alerts`   | Active pest outbreak alerts        |
| Not Found     | `*`              | 404 page                           |

### Key Components

- `Navbar` — sticky top navigation with mobile sheet menu
- `Layout` — shell wrapper with Navbar and Outlet
- `MapPicker` — interactive Leaflet map for location selection
- `WeatherWidget` — displays current weather for selected location
- `ResultCard` — displays a single crop recommendation
- `CropCard` — displays crop summary info
- `AlertBanner` — displays pest alert with severity badge

---

## Backend

**Stack:** Node.js, Express, TypeScript, PostgreSQL (pg)

### Folder Structure

```

src/
├── config/ # DB connection and env variables
├── controllers/ # Route handlers
├── middleware/ # Error handling and validation
├── routes/ # Express routers
├── services/ # Business logic
└── types/ # TypeScript interfaces

```

### API Endpoints

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | /api/farmers         | Get all farmers          |
| POST   | /api/farmers         | Create farmer            |
| GET    | /api/soil            | Get all soil data        |
| POST   | /api/soil            | Save soil data           |
| POST   | /api/recommendations | Get crop recommendations |
| GET    | /api/crops           | Get all crops            |
| GET    | /api/weather         | Get weather by location  |

---

## Database

**Stack:** PostgreSQL

### Tables

#### farmers

| Column     | Type      | Description         |
| ---------- | --------- | ------------------- |
| id         | SERIAL    | Primary key         |
| name       | VARCHAR   | Farmer name         |
| phone      | VARCHAR   | Phone number        |
| location   | VARCHAR   | Farm location       |
| created_at | TIMESTAMP | Record created time |

#### soil_data

| Column     | Type      | Description              |
| ---------- | --------- | ------------------------ |
| id         | SERIAL    | Primary key              |
| farmer_id  | INTEGER   | Foreign key to farmers   |
| soil_type  | VARCHAR   | Type of soil             |
| ph         | DECIMAL   | pH level                 |
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

Top 3 crops by score are returned as recommendations.

---

## External APIs

| API                       | Purpose                  | Cost |
| ------------------------- | ------------------------ | ---- |
| Open-Meteo                | Weather forecast         | Free |
| Open-Meteo Geocoding      | City to coordinates      | Free |
| Nominatim (OpenStreetMap) | Coordinates to city name | Free |
| data.gov.in               | Market prices (planned)  | Free |
| NIPHM                     | Pest alerts (planned)    | TBD  |

---

## Future Plans

- JWT based authentication
- Real market prices via data.gov.in
- Real pest alerts via NIPHM
- Mobile responsive refinements
- Farmer dashboard with history

```

```
