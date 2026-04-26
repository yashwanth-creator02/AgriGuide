# AgriGuide Backend

Node.js + Express + TypeScript backend for the AgriGuide crop advisory system.

---

## Tech Stack

- **Node.js** — Runtime
- **Express** — Web framework
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
- PostgreSQL

### Installation

```bash
cd backend
npm install
```

---

## Environment Variables

Create a `.env` file in the root of the project:

```env id="env-backend"
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

Make sure PostgreSQL is running and create the database:

```sql id="db-create"
CREATE DATABASE agriguide;
```

Then run the migrations in order:

```sql id="db-migrate"
\i 'path/to/database/migrations/001_create_farmers.sql'
\i 'path/to/database/migrations/002_create_soil_data.sql'
\i 'path/to/database/migrations/003_create_recommendations.sql'
\i 'path/to/database/migrations/004_create_users.sql'
```

---

## Running in Development

```bash id="dev-run"
npm run dev
```

Server runs at `http://localhost:5000`

---

## Building for Production

```bash id="prod-build"
npm run build
npm start
```

---

## Folder Structure

```bash id="folder-structure"
src/
├── config/             # DB connection and env variables
│   ├── db.ts
│   └── env.ts
├── controllers/        # Route handlers
│   ├── authController.ts
│   ├── cropController.ts
│   ├── farmerController.ts
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

| Method | Endpoint              | Auth | Description         |
| ------ | --------------------- | ---- | ------------------- |
| POST   | /api/auth/signup      | No   | Register farmer     |
| POST   | /api/auth/login       | No   | Login farmer        |
| GET    | /api/auth/me          | Yes  | Get current farmer  |
| GET    | /api/farmers          | No   | Get all farmers     |
| POST   | /api/farmers          | No   | Create farmer       |
| GET    | /api/soil             | No   | Get all soil data   |
| POST   | /api/soil             | No   | Save soil data      |
| GET    | /api/soil/history/:id | No   | Get history         |
| POST   | /api/recommendations  | No   | Get recommendations |
| GET    | /api/crops            | No   | Get all crops       |
| GET    | /api/weather          | No   | Get weather         |
| GET    | /api/market           | No   | Get market prices   |

---

## External APIs

| API                  | Purpose             |
| -------------------- | ------------------- |
| Open-Meteo           | Weather forecast    |
| Open-Meteo Geocoding | City to coordinates |
| Nominatim            | Reverse geocoding   |
| data.gov.in          | Live mandi prices   |
