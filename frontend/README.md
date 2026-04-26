# AgriGuide Frontend

React + TypeScript frontend for the AgriGuide crop advisory system.

---

## Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **shadcn/ui** — UI components
- **React Router** — Client-side routing
- **Leaflet.js** — Interactive map for location picking

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

### Running in Development

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

---

## Folder Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # App shell with Navbar
│   ├── Navbar.tsx      # Top navigation with profile dropdown
│   ├── MapPicker.tsx   # Leaflet map for location selection
│   ├── WeatherWidget.tsx
│   ├── ResultCard.tsx
│   ├── CropCard.tsx
│   ├── AlertBanner.tsx
│   └── ProtectedRoute.tsx
├── pages/              # One file per route
│   ├── Home.tsx
│   ├── SoilInput.tsx
│   ├── Results.tsx
│   ├── CropInfo.tsx
│   ├── MarketPrices.tsx
│   ├── PestAlerts.tsx
│   ├── History.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
│   ├── useWeather.ts
│   └── useCropRecommend.ts
├── services/           # API call functions
│   ├── authService.ts
│   ├── cropService.ts
│   ├── weatherService.ts
│   └── marketService.ts
├── types/              # TypeScript interfaces
│   └── index.ts
├── constants/          # App constants
│   └── index.ts
└── lib/                # Utility functions
    └── utils.ts
```

---

## Pages

| Page          | Route            | Auth Required |
| ------------- | ---------------- | ------------- |
| Home          | `/`              | No            |
| Soil Input    | `/soil-input`    | Yes           |
| Results       | `/results`       | Yes           |
| Crop Guide    | `/crop-info`     | Yes           |
| Market Prices | `/market-prices` | Yes           |
| Pest Alerts   | `/pest-alerts`   | Yes           |
| History       | `/history`       | Yes           |
| Login         | `/login`         | No            |
| Signup        | `/signup`        | No            |

```

```
