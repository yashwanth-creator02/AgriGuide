# AgriGuide Backend

Node.js + Express + TypeScript backend for the AgriGuide crop advisory system.

---

## Tech Stack

- **Node.js** — Runtime
- **Express 5** — Web framework
- **TypeScript** — Type safety
- **PostgreSQL** — Database
- **bcrypt** — Password hashing
- **jsonwebtoken** — JWT authentication
- **nodemon** — Development server

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL 14+

### Installation

```bash
cd backend
npm install
```

---

## Environment Variables

Create a `.env` file in the root of the project:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=agriguide
JWT_SECRET=your_jwt_secret
MARKET_API_KEY=your_data_gov_in_api_key
```

---

## Database Setup

Make sure PostgreSQL is running, create the database, and run schema and seed scripts:

```bash
psql -U postgres -c "CREATE DATABASE agriguide;"
psql -U postgres -d agriguide -f ../database/schema.sql
psql -U postgres -d agriguide -f ../database/seeds/seed_crops.sql
psql -U postgres -d agriguide -f ../database/seeds/seed_pest_alerts.sql
```

---

## Running in Development

```bash
npm run dev
```

Server runs at `http://localhost:5000`

---

## Building for Production

```bash
npm run build
npm start
```

---

## Folder Structure

```
src/
├── config/             # DB connection and env variables
│   ├── db.ts
│   └── env.ts
├── controllers/        # Route handlers
│   ├── authController.ts
│   ├── cropController.ts
│   ├── farmerController.ts
│   ├── marketController.ts
│   ├── pestController.ts
│   ├── recommendController.ts
│   ├── soilController.ts
│   └── weatherController.ts
├── middleware/         # Express middleware
│   ├── authMiddleware.ts
│   ├── errorHandler.ts
│   └── validateRequest.ts
├── routes/             # Express routers
│   ├── authRoutes.ts
│   ├── cropRoutes.ts
│   ├── farmerRoutes.ts
│   ├── marketRoutes.ts
│   ├── pestRoutes.ts
│   ├── recommendRoutes.ts
│   ├── soilRoutes.ts
│   └── weatherRoutes.ts
├── services/           # Business logic
│   ├── cropService.ts
│   ├── recommendService.ts
│   └── externalApiService.ts
├── types/              # TypeScript interfaces
│   └── index.ts
└── app.ts              # Express app setup
server.ts               # Server entry point
```

---

## API Endpoints

| Method | Endpoint                    | Auth | Description                                      |
| ------ | --------------------------- | ---- | ------------------------------------------------ |
| POST   | /api/auth/signup            | No   | Register new farmer account                      |
| POST   | /api/auth/login             | No   | Authenticate and receive JWT token               |
| GET    | /api/auth/me                | Yes  | Get authenticated farmer profile                 |
| GET    | /api/farmers                | No   | Public farmer directory (safe fields only)       |
| GET    | /api/farmers/:id            | No   | Get farmer public details                        |
| PUT    | /api/farmers/:id            | Yes  | Update farmer details (authenticated user only)  |
| DELETE | /api/farmers/:id            | Yes  | Delete farmer account (authenticated user only)  |
| GET    | /api/soil                   | No   | Get all soil records                             |
| POST   | /api/soil                   | Yes  | Save soil analysis data                          |
| GET    | /api/soil/history/:farmer_id| No   | Get soil test history with recommendations       |
| DELETE | /api/soil/:id               | Yes  | Delete soil entry                                |
| POST   | /api/recommendations        | No   | Score crops against soil test parameters         |
| GET    | /api/crops                  | No   | Get all crop guidelines                          |
| GET    | /api/crops/:name            | No   | Get specific crop details                        |
| GET    | /api/weather                | No   | Current weather by location                      |
| GET    | /api/weather/reverse        | No   | Reverse geocode coordinates to location name     |
| GET    | /api/market                 | No   | Live mandi prices from data.gov.in               |
| GET    | /api/pests                  | No   | Pest alerts with severity rankings               |
| GET    | /api/pests/severity/:sev    | No   | Filter pest alerts by severity level             |
| GET    | /api/pests/crop/:crop_id    | No   | Filter pest alerts by crop                       |

---

## External APIs

| API           | Purpose                                              |
| ------------- | ---------------------------------------------------- |
| Open-Meteo    | Real-time weather and coordinate geocoding           |
| Nominatim     | Reverse geocoding proxy with custom User-Agent       |
| data.gov.in   | Live mandi commodity prices (Agmarknet)              |
