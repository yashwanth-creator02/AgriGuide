# File Inventory

Tracked repository files and their roles in AgriSuggest.

## Root Configuration & Governance

- `.gitignore`: Standard git ignore file
- `.vscode/settings.json`: VS Code editor configuration
- `AGENTS.md`: Agent directives, architecture documentation, commands, and conventions
- `LICENSE`: Project license file
- `README.md`: Project summary, setup guide, and overview
- `.opencode/opencode.jsonc`: OpenCode repository capability policy profile

## Documentation (`docs/`)

- `docs/API_docs.md`: API documentation and endpoint contracts
- `docs/ER_diagram.png`: Database Entity-Relationship diagram
- `docs/FILE_INVENTORY.md`: Inventory of tracked repository files
- `docs/system_design.md`: Architecture design, data flow, and external integrations

## Database (`database/`)

- `database/schema.sql`: Full database schema definition
- `database/migrations/001_create_farmers.sql`: Migration for farmers table (including email and password)
- `database/migrations/002_create_soil_data.sql`: Migration for soil data table
- `database/migrations/003_create_recommendations.sql`: Migration for recommendations table
- `database/migrations/004_create_users.sql`: Migration consolidating user credentials into farmers table
- `database/seeds/seed_crops.sql`: Baseline crop data seed (Wheat, Rice, Maize, Groundnut, Cotton, Sugarcane, Mustard, Chickpea)
- `database/seeds/seed_pest_alerts.sql`: Seed data for pest alerts

## Backend (`backend/`)

- `backend/README.md`: Backend documentation
- `backend/package.json`: Node.js dependencies and run scripts
- `backend/package-lock.json`: Dependency lockfile
- `backend/tsconfig.json`: TypeScript compiler options for backend
- `backend/server.ts`: Server entrypoint and Express app runner
- `backend/src/app.ts`: Express application configuration and middleware setup
- `backend/src/config/db.ts`: PostgreSQL connection pool setup
- `backend/src/config/env.ts`: Environment variable loader and parser (enforces JWT_SECRET)
- `backend/src/controllers/authController.ts`: Auth endpoints logic (signup/login/getMe)
- `backend/src/controllers/cropController.ts`: Crop data controller
- `backend/src/controllers/farmerController.ts`: Farmer profile controller (safe fields only, protected mutations)
- `backend/src/controllers/marketController.ts`: Mandi market price controller
- `backend/src/controllers/pestController.ts`: Pest alerts controller
- `backend/src/controllers/recommendController.ts`: Recommendation engine controller
- `backend/src/controllers/soilController.ts`: Soil data submission controller (O(1) batch history query)
- `backend/src/controllers/weatherController.ts`: Weather data and reverse geocoding controller
- `backend/src/middleware/authMiddleware.ts`: JWT authentication verification middleware
- `backend/src/middleware/errorHandler.ts`: Global error handler middleware
- `backend/src/middleware/validateRequest.ts`: Request validation helper middleware
- `backend/src/routes/authRoutes.ts`: Express router for auth
- `backend/src/routes/cropRoutes.ts`: Express router for crops
- `backend/src/routes/farmerRoutes.ts`: Express router for farmers
- `backend/src/routes/marketRoutes.ts`: Express router for mandi prices
- `backend/src/routes/pestRoutes.ts`: Express router for pests
- `backend/src/routes/recommendRoutes.ts`: Express router for recommendations
- `backend/src/routes/soilRoutes.ts`: Express router for soil data
- `backend/src/routes/weatherRoutes.ts`: Express router for weather and reverse geocoding
- `backend/src/services/cropService.ts`: Crop service logic
- `backend/src/services/externalApiService.ts`: Client for external APIs (data.gov.in, Open-Meteo, reverse-geocoding)
- `backend/src/services/recommendService.ts`: Core crop recommendation algorithm (null-safe and case-insensitive)
- `backend/src/types/index.ts`: Shared TypeScript interfaces and types for backend

## Frontend (`frontend/`)

- `frontend/.editorconfig`: Editor configuration
- `frontend/.env.example`: Example environment file for Vite
- `frontend/.prettierignore`: Prettier ignore rules
- `frontend/.prettierrc`: Prettier formatting rules
- `frontend/.vscode/settings.json`: VS Code frontend workspace settings
- `frontend/README.md`: Frontend overview
- `frontend/eslint.config.js`: ESLint configuration
- `frontend/index.html`: Vite HTML entry point
- `frontend/package.json`: Frontend dependencies and scripts
- `frontend/package-lock.json`: Frontend lockfile
- `frontend/postcss.config.js`: PostCSS configuration
- `frontend/tailwind.config.js`: Tailwind CSS design configuration
- `frontend/tsconfig.json`: Root TypeScript configuration
- `frontend/tsconfig.app.json`: Frontend application TypeScript settings
- `frontend/tsconfig.node.json`: Vite node config TypeScript settings
- `frontend/vite.config.ts`: Vite build and dev server config
- `frontend/src/main.tsx`: React DOM mount point
- `frontend/src/App.tsx`: Top-level app routing, route aliases, and error fallback
- `frontend/src/index.css`: Tailwind directives and custom styles
- `frontend/src/lib/utils.ts`: Utility functions (cn class merging)
- `frontend/src/vite-env.d.ts`: Vite ambient type declarations
- `frontend/src/constants/index.ts`: UI constants and options
- `frontend/src/types/index.ts`: Domain frontend types
- `frontend/src/hooks/useWeather.ts`: Weather hook
- `frontend/src/hooks/useCropRecommend.ts`: Crop recommendation hook (surfaces backend errors)
- `frontend/src/hooks/use-toast.ts`: Toast management hook
- `frontend/src/hooks/use-mobile.tsx`: Mobile viewport detection hook
- `frontend/src/components/Navbar.tsx`: Header navigation bar (non-blocking mobile drawer, robust routing)
- `frontend/src/components/Layout.tsx`: General page layout wrapper
- `frontend/src/components/ProtectedRoute.tsx`: Route protection wrapper with return path preservation
- `frontend/src/components/WeatherWidget.tsx`: Weather display component
- `frontend/src/components/MapPicker.tsx`: Leaflet map location selector with reverse-geocoding proxy
- `frontend/src/components/CropCard.tsx`: Crop display card
- `frontend/src/components/ResultCard.tsx`: Recommendation result card
- `frontend/src/components/AlertBanner.tsx`: Pest and hazard alert banner
- `frontend/src/components/ui/*`: Radix UI primitive components styled with Tailwind CSS
- `frontend/src/pages/Home.tsx`: Landing page
- `frontend/src/pages/SoilInput.tsx`: Soil parameter input form page
- `frontend/src/pages/Results.tsx`: Crop recommendation results page
- `frontend/src/pages/MarketPrices.tsx`: Mandi market price dashboard
- `frontend/src/pages/PestAlerts.tsx`: Pest alert monitoring page
- `frontend/src/pages/CropInfo.tsx`: Crop library catalog page
- `frontend/src/pages/History.tsx`: Historical soil submissions and results
- `frontend/src/pages/Profile.tsx`: Farmer profile page
- `frontend/src/pages/Login.tsx`: Login page (redirects back to intended destination)
- `frontend/src/pages/Signup.tsx`: Signup page
- `frontend/src/pages/NotFound.tsx`: 404 page inside layout
- `frontend/src/services/authService.ts`: Frontend auth API client and JWT header injection
- `frontend/src/services/cropService.ts`: Frontend crop API client
- `frontend/src/services/marketService.ts`: Frontend market prices API client
- `frontend/src/services/pestService.ts`: Frontend pest alerts API client
- `frontend/src/services/profileService.ts`: Frontend farmer profile API client
- `frontend/src/services/recommendService.ts`: Frontend recommendation API client
- `frontend/src/services/soilService.ts`: Frontend soil API client
- `frontend/src/services/weatherService.ts`: Frontend weather API client
